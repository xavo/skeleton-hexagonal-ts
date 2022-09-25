/* eslint-disable */

import {Connection, Message, Exchange, Queue} from 'amqp-ts';
import {DomainEvent} from 'src/Shared/Domain/EventBus/DomainEvent';
import {DomainEventSubscriber} from 'src/Shared/Domain/EventBus/DomainEventSubscriber';
import {EventBus} from 'src/Shared/Domain/EventBus/EventBus';
import Logger from 'src/Shared/Domain/Logger';
import {DomainEventJsonDeserializer} from 'src/Shared/Infrastructure/EventBus/DomainEventJsonDeserializer';
import {DomainEventMapping} from 'src/Shared/Infrastructure/EventBus/DomainEventMapping';
import RabbitMqConfig from './RabbitMqConfig';

export default class RabbitMqEventbus implements EventBus {
    private connection: Connection;
    private exchange: Exchange;
    private queue: Queue;
    private logger: Logger;
    private deserializer?: DomainEventJsonDeserializer;
    private subscribers: Map<string, Array<DomainEventSubscriber<DomainEvent>>>;

    constructor(config: RabbitMqConfig, logger: Logger) {
        this.logger = logger;
        this.connection = new Connection(
            `amqp://${config.user}:${config.password}@${config.host}`
        );

        this.exchange = this.connection.declareExchange(
            config.exchange,
            'fanout',
            {durable: false}
        );
        this.queue = this.connection.declareQueue(config.queue);
        this.subscribers = new Map();
    }

    async start(): Promise<void> {
        if (!this.deserializer) {
            throw new Error(
                'RabbitMqEventBus has not being properly initialized, deserializer is missing'
            );
        }

        await this.queue.bind(this.exchange);
        await this.queue.activateConsumer(
            async (message) => {
                const event = this.deserializer!.deserialize(
                    message.content.toString()
                );
                if (event) {
                    const subscribers = this.subscribers.get(event.eventName);
                    if (subscribers && subscribers.length) {
                        const subscribersNames = subscribers.map(
                            (subscriber) => subscriber.constructor.name
                        );
                        this.logger.info(
                            `[RabbitMqEventBus] Message processed: ${event.eventName} by ${subscribersNames}`
                        );
                        const subscribersExecutions = subscribers.map(
                            (subscriber) => subscriber.on(event)
                        );
                        await Promise.all(subscribersExecutions);
                    }
                }
                message.ack();
            },
            {noAck: false}
        );
    }

    async publish(events: Array<DomainEvent>): Promise<void> {
        const executions: any = [];
        events.map((event) => {
            const message = new Message({
                data: {
                    type: event.eventName,
                    occurred_on: event.occurredOn,
                    id: event.eventId,
                    attributes: event.toPrimitives(),
                },
                meta: {},
            });
            this.logger.info(
                `[RabbitMqEventBus] Event to be published: ${event.eventName}`
            );
            executions.push(this.exchange.send(message));
        });

        await Promise.all(executions);
    }

    addSubscribers(...subscribers: DomainEventSubscriber<DomainEvent>[]): void {
        subscribers.map((subscriber: DomainEventSubscriber<DomainEvent>) =>
            this.addSubscriber(subscriber)
        );
    }
    private addSubscriber(
        subscriber: DomainEventSubscriber<DomainEvent>
    ): void {
        const eventName = subscriber.subscribedTo().EVENT_NAME;

        this.subscribers.set(eventName, [
            ...(this.subscribers.get(eventName) ?? []),
            subscriber,
        ]);
    }

    setDomainEventMapping(domainEventMapping: DomainEventMapping): void {
        this.deserializer = new DomainEventJsonDeserializer(domainEventMapping);
    }
}
