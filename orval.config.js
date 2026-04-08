module.exports = {
    'main': {
        input: './src/shared/schema/schema.yaml',
        output: {
            target: './src/shared/api/api-new.ts',
            prettier: true,
            override: {
                mutator: {
                    path: './src/shared/api/orval-mutator.js',
                    name: 'createInstance',
                }
            }
        }
    },
}
