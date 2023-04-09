import { blue, green, red, yellow } from "chalk"import { execSync } from "child_process"import { Command } from "commander"import * as fs from "fs"const packageRules: Lint.PackageRule[] = [  { executable: "git", errorMessage: "Install it using winget." },  { executable: "scoop", errorMessage: "Follow https://github.com/bn-digital/scoop for setup instructions" },  { executable: "node", errorMessage: "Install it using scoop" },  { executable: "yarn", errorMessage: "Install it using npm with global scope" },]const envVarRules: Lint.EnvVarRule[] = [  {    key: "GITHUB_TOKEN",    regex: /^ghp_/,    errorMessage: "Github Token should start with 'ghp_",  },  {    key: "NPM_AUTH_TOKEN",    regex: /^npm_/,    errorMessage: "NPM Token should start with 'ghp_",  },  {    key: "VAULT_ENDPOINT",    regex: /^https:\/\/vault.bndigital.dev/,    errorMessage: "Vault endpoint should be 'https://vault.bndigital.dev'",  },]/** * Used to add spaces after key to align description text * @param {string} key * @param {number} longestKey */const tabbedSpaceAfterKey: (key: string, longestKey: number) => string = (key, longestKey) =>  new Array(longestKey - (key.length % (longestKey + 1)) + 2).join(" ")const longestEnvVarKey = envVarRules.reduce((acc, { key }) => (key.length > acc ? key.length : acc), 0)const longestPackageExecutable = packageRules.reduce(  (acc, { executable }) => (executable.length > acc ? executable.length : acc),  0)const packageCommand = new Command("packages").description("Check if Scoop is installed").action(() => {  function check({ executable, errorMessage }: Lint.PackageRule): boolean {    let isValid: boolean    try {      execSync(`which ${executable}`, { encoding: "utf8" })      isValid = true    } catch (error) {      isValid = false    }    const icon = isValid ? green("✔") : red("✖")    console.log(      [        icon,        yellow(executable),        tabbedSpaceAfterKey(executable, longestPackageExecutable),        !isValid ? red(`Not installed: ${errorMessage}`) : green("Installed"),      ].join(" ")    )    return isValid  }  console.log(blue("Verifying required packages..."))  packageRules.forEach(check)  console.log("\n")})const envCommand = new Command("env").description("Check if requried environment variables are set").action(() => {  function check({ key, regex, errorMessage }: Lint.EnvVarRule): boolean {    const isValid = regex.test(process.env?.[key] ?? "")    const icon = isValid ? green("✔") : red("✖")    console.log(      [        icon,        yellow(key),        tabbedSpaceAfterKey(key, longestEnvVarKey),        !isValid ? red(`Invalid: ${errorMessage}`) : green("Valid"),      ].join(" ")    )    return isValid  }  console.log(blue("Verifying environment variables...\n"))  envVarRules.forEach(check)  console.log("\n")})const sourceCommand = new Command("code").description("Check your sources with bundle of linters").action(() => {  function check({ executable, errorMessage }: Lint.PackageRule): boolean {    console.log(blue(`Verifying ${executable} executable... `))    const binaryPath = execSync(`which ${executable}`, { encoding: "utf8" })    const isValid = fs.existsSync(binaryPath)    !isValid && console.log(red(`Not installed: ${errorMessage}`))    console.log("\n")    return isValid  }  console.log(blue("Verifying required packages..."))  packageRules.forEach(check)  console.log("\n")})const subcommands: { [key in Lint.RuleType]: Command } = {  package: packageCommand,  env: envCommand,  source: sourceCommand,}const command = new Command("lint")  .description("Manage user's environment variables ")  .argument("rules [" + "", "Rules to check")  .addCommand(envCommand)  .addCommand(packageCommand)  .addCommand(sourceCommand)  .action((args: string) => {    const rules = args.split(",") as Lint.RuleType[]    rules.forEach(rule => subcommands[rule]?.parse())  })export { command }