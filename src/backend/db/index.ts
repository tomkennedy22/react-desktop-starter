import { Prisma, PrismaClient } from "./prisma-client/client"

import {
    PlayerPosition as PlayerPositionEnum,
    PlayerPositionGroupExhaustive as PlayerPositionGroupExhaustiveEnum,
    PlayerPositionGroup as PlayerPositionGroupEnum,
    CoachPosition as CoachPositionEnum,
    SchoolClass as SchoolClassEnum,
} from "./prisma-client/client";

import type {
    Ethnicity,
    Game,
    Person,
    PlayerTeamGame,
    PlayerTeam,
    Team,
    TeamGame,
    // Enums
    PlayerPosition,
    PlayerPositionGroupExhaustive,
    PlayerPositionGroup,
    CoachPosition,
    Prisma as PrismaType,
    SchoolClass,
} from "./prisma-client/client";


export { Prisma };

export type {
    PrismaType,
    Person,
    PlayerTeamGame,
    PlayerTeam,
    Team,
    TeamGame,
    Game,
    // Enums
    PlayerPosition,
    Ethnicity,
    PlayerPositionGroupExhaustive,
    PlayerPositionGroup,
    CoachPosition,
    SchoolClass,
};

export {
    PlayerPositionEnum,
    PlayerPositionGroupExhaustiveEnum,
    PlayerPositionGroupEnum,
    CoachPositionEnum,
    SchoolClassEnum,
};