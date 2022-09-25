/* eslint-disable @typescript-eslint/no-explicit-any */
import {AggregateRoot} from '@project/Shared/Domain/AggregateRoot';
import {Criteria} from '@project/Shared/Domain/Criteria/Criteria';
import {FilterOperator} from '@project/Shared/Domain/Criteria/FilterOperator';
import {FilterValue} from '@project/Shared/Domain/Criteria/FilterValue';
import {Nullable} from '@project/Shared/Domain/Nullable';
import {
    Connection,
    EntitySchema,
    Repository,
    SelectQueryBuilder,
} from 'typeorm';

export abstract class TypeOrmRepository<T extends AggregateRoot> {
    constructor(protected readonly connection: Connection) {}

    protected abstract get entitySchema(): EntitySchema;

    protected get repository(): Repository<T> {
        return this.connection.getRepository<T>(this.entitySchema);
    }

    protected criteriaToQueryBuilder(
        criteria: Criteria
    ): SelectQueryBuilder<T> {
        const queryBuilder = this.repository.createQueryBuilder().select();

        criteria.filters.forEach((filter) => {
            const field = String(filter.field);

            const operator =
                TypeOrmRepository.mapFilterOperatorToDatabaseOperator(
                    filter.operator,
                    filter.value
                );

            const value = TypeOrmRepository.prepareValue(
                filter.operator,
                filter.value
            );

            queryBuilder.andWhere(`${field} ${operator} :${field}`, {
                [field]: value,
            });
        });

        if (criteria.order) {
            queryBuilder.orderBy(
                String(criteria.order.orderBy),
                String(criteria.order.orderType).toUpperCase() as 'ASC' | 'DESC'
            );
        }

        queryBuilder.limit(criteria?.limit);
        queryBuilder.offset(criteria?.offset);

        return queryBuilder;
    }

    protected static prepareValue(
        operator: FilterOperator,
        value: Nullable<FilterValue>
    ): string | null {
        if (operator.isContainsOrNotContains()) {
            return `%${String(value)}%`;
        }

        if (value === null) {
            return value;
        }

        return value.value;
    }

    protected static mapFilterOperatorToDatabaseOperator(
        operator: FilterOperator,
        value: Nullable<FilterValue>
    ): string {
        const customMap = {
            [String(FilterOperator.Contains)]: 'LIKE',
            [String(FilterOperator.NotContains)]: 'NOT LIKE',
        };

        const nullCustomMap = {
            [String(FilterOperator.Equal)]: 'IS',
            [String(FilterOperator.Contains)]: 'IS',
            [String(FilterOperator.NotEqual)]: 'IS NOT',
            [String(FilterOperator.NotContains)]: 'IS NOT',
        };

        return value === null
            ? nullCustomMap?.[operator.value] ?? operator.value
            : customMap?.[operator.value] ?? operator.value;
    }

    protected async persist(aggregateRoot: T): Promise<void> {
        await this.repository.save(aggregateRoot as any, {reload: false});
    }

    protected async remove(aggregateRoot: T): Promise<void> {
        await this.repository.softRemove(aggregateRoot as any, {reload: false});
    }
}
