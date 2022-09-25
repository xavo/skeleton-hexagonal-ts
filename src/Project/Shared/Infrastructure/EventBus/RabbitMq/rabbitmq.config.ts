import RabbitMqConfig from '@project/Shared/Infrastructure/EventBus/RabbitMq/RabbitMqConfig';

export default async (): Promise<{rabbitMqConfig: RabbitMqConfig}> => {
    const {config} = await import('./config');

    return {rabbitMqConfig: config};
};
