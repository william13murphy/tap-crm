// Role name constants.

const SUPERUSER = 'SUPERUSER';
const EFCADMIN = 'EFCADMIN';
const EFCBILL = 'EFCBILL';
const EFCNOBILL = 'EFCNOBILL';
const CLADMIN = 'CLADMIN';
const SCHADMIN = 'SCHADMIN';
const SCHFIN = 'SCHFIN';
const SCHNOFIN = 'SCHNOFIN';
const SCHUSER = 'SCHUSER';
const INSTRUCT = 'INSTRUCT';
const STUDENT = 'STUDENT';

// All roles.

export const allRoles = [
  SUPERUSER,
  EFCADMIN,
  EFCBILL,
  EFCNOBILL,
  CLADMIN,
  SCHADMIN,
  SCHFIN,
  SCHNOFIN,
  SCHUSER,
  INSTRUCT,
  STUDENT,
];

// Using phaseOneRoles should generally be avoided. Instead use allRoles above.
export const phaseOneRoles = [
  SUPERUSER,
  EFCADMIN,
  EFCBILL,
  EFCNOBILL,
  CLADMIN,
  SCHADMIN,
  // SCHFIN, // Phase 2 Role
  // SCHNOFIN, // Phase 2 Role
  // SCHUSER, // Phase 2 Role
  INSTRUCT,
  STUDENT,
];

// Role levels: includes a minimum role and all roles above it.

const LEVEL_EFCADMIN = allRoles.slice(0, 2);
const LEVEL_EFCBILL = allRoles.slice(0, 3);
const LEVEL_EFCNOBILL = allRoles.slice(0, 4);
const LEVEL_CLADMIN = allRoles.slice(0, 5);
const LEVEL_SCHADMIN = allRoles.slice(0, 6);
const LEVEL_SCHFIN = allRoles.slice(0, 7);
const LEVEL_SCHNOFIN = allRoles.slice(0, 8);
const LEVEL_SCHUSER = allRoles.slice(0, 9);
const LEVEL_INSTRUCT = allRoles.slice(0, 10);

// Role subsets: a subset of roles, not necessarily organized by level.

const SUBSET_EFC_STAFF = [SUPERUSER, EFCADMIN, EFCBILL, EFCNOBILL];

const SUBSET_SCHOOL_STAFF = [
  CLADMIN,
  SCHADMIN,
  SCHFIN,
  SCHNOFIN,
  SCHUSER,
  INSTRUCT,
];

const SUBSET_SINGLE_SCHOOL_STAFF = [
  SCHADMIN,
  SCHFIN,
  SCHNOFIN,
  SCHUSER,
  INSTRUCT,
];

const SUBSET_NON_EFC = [
  CLADMIN,
  SCHADMIN,
  SCHFIN,
  SCHNOFIN,
  SCHUSER,
  INSTRUCT,
  STUDENT,
];

// Exported roles object.

export const roles = {
  all: allRoles,
  LEVEL_EFCADMIN,
  LEVEL_EFCBILL,
  LEVEL_EFCNOBILL,
  LEVEL_CLADMIN,
  LEVEL_SCHADMIN,
  LEVEL_SCHFIN,
  LEVEL_SCHNOFIN,
  LEVEL_SCHUSER,
  LEVEL_INSTRUCT,

  SUBSET_EFC_STAFF,
  SUBSET_SCHOOL_STAFF,
  SUBSET_SINGLE_SCHOOL_STAFF,
  SUBSET_NON_EFC,

  SUPERUSER,
  EFCADMIN,
  EFCBILL,
  EFCNOBILL,
  CLADMIN,
  SCHADMIN,
  SCHFIN,
  SCHNOFIN,
  SCHUSER,
  INSTRUCT,
  STUDENT,
};

// authorizeRole: Checks that user's role is included in an array of allowed roles.

export function authorizeRole(activeRole, allowedRoles) {
  if (allowedRoles.includes(activeRole)) {
    return true;
  } else {
    return false;
  }
}
