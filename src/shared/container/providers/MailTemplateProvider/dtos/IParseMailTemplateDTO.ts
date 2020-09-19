interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}

// Sempre que uma interface receber mais do que uma informação (informação composta) criar um DTO
