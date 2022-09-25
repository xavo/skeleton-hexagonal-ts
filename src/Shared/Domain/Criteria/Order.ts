import {OrderBy} from './OrderBy';
import {OrderType, OrderTypes} from './OrderType';

export class Order {
    readonly orderBy: OrderBy;
    readonly orderType: OrderType;

    constructor(orderBy: OrderBy, orderType: OrderType) {
        this.orderBy = orderBy;
        this.orderType = orderType;
    }

    static fromPrimitives(order: {
        orderBy?: string;
        orderType?: string;
    }): Order {
        if (!order.orderBy) {
            return Order.none();
        }

        return new Order(
            new OrderBy(order.orderBy),
            OrderType.fromValue(order.orderType || OrderTypes.ASC)
        );
    }

    static none(): Order {
        return new Order(new OrderBy(''), new OrderType(OrderTypes.NONE));
    }

    static desc(orderBy: string): Order {
        return new Order(new OrderBy(orderBy), new OrderType(OrderTypes.DESC));
    }

    static asc(orderBy: string): Order {
        return new Order(new OrderBy(orderBy), new OrderType(OrderTypes.ASC));
    }

    public hasOrder(): boolean {
        return !this.orderType.isNone();
    }
}
