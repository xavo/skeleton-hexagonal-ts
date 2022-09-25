import {get} from 'env-var';
import RabbitMqConfig from '@project/Shared/Infrastructure/EventBus/RabbitMq/RabbitMqConfig';

export const config: RabbitMqConfig = {
    host: get('RABBITMQ_HOST').required().asString(),
    user: get('RABBITMQ_USER').required().asString(),
    password: get('RABBITMQ_PASSWORD').required().asString(),
    exchange: get('RABBITMQ_EXCHANGE').required().asString(),
    queue: get('RABBITMQ_QUEUE').required().asString(),
};

export default config;
