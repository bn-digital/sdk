namespace Lint {

  type RuleType = 'packages' | 'env' | 'code' | string

  type EnvVarRule = { key: string; regex: RegExp; errorMessage: string }

  type PackageRule = { executable: string; errorMessage: string }
}

