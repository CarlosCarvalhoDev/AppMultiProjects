export interface EnvironmentAppModel{
  nome: string, //NOME DO PROJETO
  baseref: string, //URL DA API BACK END QUE SERA USADA.
  production: boolean,
  cores: {            //-------------------------------------------------
    primary: string,  //********************************************** */
    secondary: string //EXEMPLO DE CORES PADROES POR APLICACAO PRE BUILD.
  }                   //********************************************** */
}
