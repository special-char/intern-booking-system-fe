import type { FieldHook } from 'payload'

export const validateUniqueColorRoles: FieldHook = ({ value, siblingData, data, operation }) => {
  if (!Array.isArray(value)) return value;

  const roles = new Set();
  for (const item of value) {
    if (roles.has(item.name)) {
      throw new Error(`Duplicate color role '${item.name}' is not allowed in the color palette.`);
    }
    roles.add(item.name);
  }

  return value;
};
