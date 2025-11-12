type UpdateObjectOptions<T> = {
  removingFields?: (keyof T)[];
  addingFields?: Partial<T> | Record<string, any>;
};

export function updateObject<T extends Record<string, any>>(obj: T, options: UpdateObjectOptions<T>): T {
  const { removingFields, addingFields } = options;

  const result: T = { ...obj };

  if (removingFields?.length) {
    for (const key of removingFields) {
      delete result[key];
    }
  }

  if (addingFields) {
    Object.assign(result, addingFields);
  }

  return result;
}
