import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { User } from "./user";

export class Workout extends Model<InferAttributes<Workout>, InferCreationAttributes<Workout>>{
    declare workoutId: number;
    declare username: string;
    declare title: string;
    declare description: string;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

export function WorkoutFactory(sequelize: Sequelize) {
    Workout.init({
        workoutId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        freezeTableName: true,
        tableName: 'workouts',
        sequelize
    });
}

export function AssociateUserWorkout() {
    User.hasMany(Workout, { foreignKey: 'username' });
    Workout.belongsTo(User, { foreignKey: 'username' });
}