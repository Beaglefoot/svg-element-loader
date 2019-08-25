import { spawnSync } from 'child_process';
import path from 'path';
import webpack from 'webpack';
import memoryfs from 'memory-fs';

export default (fixture: string): Promise<webpack.Stats> => {
  // Get compiled loader to test against
  const { status } = spawnSync('tsc');

  if (status !== 0) {
    throw new Error('Failed to compile loader');
  }

  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: {
            loader: path.resolve(__dirname, '../dist/loader.js')
          }
        }
      ]
    }
  });

  compiler.outputFileSystem = new memoryfs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      if (stats.hasErrors()) reject(new Error(stats.toJson().errors.join(', ')));

      resolve(stats);
    });
  });
};
