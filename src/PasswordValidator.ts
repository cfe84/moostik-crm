interface Criteria {
  description: string,
  test: (pwd: string) => boolean
}

const level1criteria: Criteria[] = [
  {
    description: "Password must be more than 8 characters",
    test: (pwd: string) => pwd.length > 8
  },
  {
    description: "Password must be less than 14 characters",
    test: (pwd: string) => pwd.length < 14
  },
  {
    description: "Password must contain at least 1 lowercase character",
    test: (pwd: string) => /[a-z]/.exec(pwd) !== null
  },
  {
    description: "Password must be more than 10 characters",
    test: (pwd: string) => pwd.length > 10
  },
  {
    description: "Password must contain at least 1 uppercase character",
    test: (pwd: string) => /[A-Z]/.exec(pwd) !== null
  },
  {
    description: "Password must contain at least 1 digit",
    test: (pwd: string) => /\d/.exec(pwd) !== null
  },
  {
    description: "Password must contain at least 1 special character",
    test: (pwd: string) => /[@#$%*+=:-]/.exec(pwd) !== null
  },
];

const level2criteria: Criteria[] = [
  {
    description: "Password must contain at least 2 uppercase characters",
    test: (pwd: string) => /[A-Z].*[A-Z]/.exec(pwd) !== null
  },
  {
    description: "Password must contain at least 2 digits",
    test: (pwd: string) => /\d.*\d/.exec(pwd) !== null
  },
  {
    description: "Password must contain at least 1 special character in: @#$%*+=-",
    test: (pwd: string) => /[@#$%*+=-]/.exec(pwd) !== null
  },
  
];

const level3criteria: Criteria[] = [
  {
    description: "Password length must be odd",
    test: (pwd: string) => pwd.length % 2 === 1
  },
  {
    description: "Password must be a prime number",
    test: (pwd: string) => pwd.length === 13 || pwd.length === 11
  },
  {
    description: "Password must be more than 12 characters",
    test: (pwd: string) => pwd.length > 12
  },
]

const level4criteria: Criteria[] = [
  {
    description: "Password must contain the character :",
    test: (pwd: string) => pwd.indexOf(":") >= 0
  },
  {
    description: "Password must contain at least 1 special character that is not :",
    test: (pwd: string) => /[@#$%*+=-]/.exec(pwd) !== null
  },
  {
    description: "Password must contain the word 'moo'",
    test: (pwd: string) => /moo/i.exec(pwd) !== null
  },
  {
    description: "Password must finish with the word 'stick'",
    test: (pwd: string) => /stick$/i.exec(pwd) !== null
  },
  {
    description: "Password must start with a digit",
    test: (pwd: string) => /^\d/.exec(pwd) !== null
  },
  {
    description: "Password must contain 3 digits",
    test: (pwd: string) => /\d.*\d.*\d/.exec(pwd) !== null
  },
  {
    description: "Password must contain the letter A twice in a row",
    test: (pwd: string) => /ff/i.exec(pwd) !== null
  },
  {
    description: "Awwww just fuck off.",
    test: (pwd: string) => false
  },
]

const criteria = [...level1criteria, ...level2criteria, ...level3criteria, ...level4criteria]

export class PasswordValidator {
  validate(pwd: string) {
    const missedCriteria = criteria.find((c => !c.test(pwd)))
    return missedCriteria?.description;
  }
}