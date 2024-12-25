module.exports = {
    'main': {
        input: './schema.yaml',
        output: {
            target: './lib/api.ts',
            prettier: true,
            override: {
                mutator: {
                    path: './lib/api-instance.ts',
                    name: 'createInstance',
                }
            }
        }
    },
}