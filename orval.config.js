module.exports = {
    'main': {
        input: './schema.yaml',
        output: {
            target: './app/api/index.ts',
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