import {DefaultNamingStrategy, NamingStrategyInterface} from 'typeorm';
import {snakeCase} from 'typeorm/util/StringUtils';

export class SnakeCaseNamingStrategy
    extends DefaultNamingStrategy
    implements NamingStrategyInterface
{
    tableName(className: string, customName: string): string {
        return customName ? customName : snakeCase(className);
    }

    columnName(
        propertyName: string,
        customName: string,
        embeddedPrefixes: string[]
    ): string {
        return (
            snakeCase(embeddedPrefixes.concat('').join('_')) +
            (customName ? customName : snakeCase(propertyName))
        );
    }

    relationName(propertyName: string): string {
        return snakeCase(propertyName);
    }

    joinColumnName(relationName: string, referencedColumnName: string): string {
        return snakeCase(relationName + '_' + referencedColumnName);
    }

    joinTableName(
        firstTableName: string,
        secondTableName: string,
        firstPropertyName: string,
        secondPropertyName: string
    ): string {
        return snakeCase(
            firstTableName +
                '_' +
                firstPropertyName.replace(/\./gi, '_') +
                '_' +
                secondTableName +
                '_' +
                secondPropertyName.replace(/\./gi, '_')
        );
    }

    joinTableColumnName(
        tableName: string,
        propertyName: string,
        columnName?: string
    ): string {
        return snakeCase(
            tableName + '_' + (columnName ? columnName : propertyName)
        );
    }

    classTableInheritanceParentColumnName(
        parentTableName: string,
        parentTableIdPropertyName: string
    ): string {
        return snakeCase(
            `${String(parentTableName)}_${String(parentTableIdPropertyName)}`
        );
    }

    eagerJoinRelationAlias(alias: string, propertyPath: string): string {
        return alias + '__' + propertyPath.replace('.', '_');
    }
}
