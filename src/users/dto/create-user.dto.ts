class CreateUserDTO {
  constructor(name: string, cpf: string, email: string, password: string) {
    this.name = name;
    this.cpf = cpf;
    this.email = email;
    this.password = password;
  }

  name: string;

  cpf: string;

  email: string;

  password: string;

  setPasswordHashed(passwordHashed: string): void {
    this.password = passwordHashed;
  }
}

export default CreateUserDTO;
