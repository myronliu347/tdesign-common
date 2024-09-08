/* eslint-disable */
const glob = require('fast-glob');
const postcss = require('postcss');
const less = require('postcss-less');
const lessc = require('less');
const fs = require('fs-extra');
const path = require('path');

const varFilePath = './style/web/components/*/_var.less';

const baseCss = fs.readFileSync('./style/web/_variables.less', 'utf-8').toString();

const filePathList = glob.sync(varFilePath);

function getVariables(nodes) {
  const list = [];

  // console.log(nodes);

  nodes.forEach((n) => {
    if (n.type !== 'atrule' || n.name === 'import' || n.name.endsWith('-cls')) {
      return;
    }

    list.push({
      name: n.name,
      value: n.value,
      cssVar: `--el-${n.name}`,
    });
  });

  return list;
}

async function transform(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8').toString();
  const result = await postcss().process(content, { parser: less });
  // console.log(result.root);
  const variables = getVariables(result.root.nodes);
  const arr = filePath.split('/');
  const compName = arr[arr.length - 2];

  return {
    name: compName,
    variables,
  };
}

async function generateCss(name, variables) {
  const filePath = path.resolve(__dirname, `./variables/${name}.css`);

  const codes = [
    baseCss,
    '/**',
    ` * @component el-${name}-pro`,
    ' */',
    ':root {'
  ];

  const varsMap = {};
  variables.forEach(({ name, cssVar, value }) => {
    codes.push(`  ${cssVar}: ${value};`);
    varsMap[`@${name}`] = `var(${cssVar})`;
  });

  codes.push('}');
  codes.push('');

  const result = await lessc.render(codes.join('\n'), {
    globalVars: varsMap,
  });

  // const result = await postcss().process(codes.join('\n'), { syntax: less });
  fs.writeFileSync(filePath, result.css, 'utf-8');
}

async function generate(files) {
  const modifyVarMap = {};
  const indexImportCodes = [];
  for (let i = 0; i < files.length; i++) {
    const { name, variables } = await transform(files[i]);
    if (variables.length === 0) {
      continue;
    }

    await generateCss(name, variables);
    variables.forEach(({ name, cssVar }) => {
      modifyVarMap[`@${name}`] = `var(${cssVar})`;
    });
    indexImportCodes.push(`@import "./${name}.css";`);
  }

  fs.writeFileSync(path.resolve(__dirname, './variables/index.css'), indexImportCodes.join('\n'), 'utf-8');
  fs.writeJSONSync(path.resolve(__dirname, './variables/vars.json'), modifyVarMap, { spaces: 2 });
}

generate(filePathList);
