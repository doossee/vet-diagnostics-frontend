module.exports = {
    'main': {
        input: './src/shared/schema/schema-new.yaml',
        output: {
            target: './src/shared/api/api-new.ts',
            prettier: true,
            override: {
                mutator: {
                    path: './src/shared/api/api-instance.ts',
                    name: 'createInstance',
                }
            }
        }
    },
}