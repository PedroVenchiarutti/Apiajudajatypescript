# Documento para Aplicação

# Padrões de commit

-- Nessa aplicação utilizaremos os padrões de commit convectional commit que consiste em 5 tipo de commit

- fix: Que seria correção em algo que estamos fazendo

- feat: Quando adicionamos alguma funcionalidade

- BREAKING CHANGE: Quando mudamos algo muito grande

- chore: quando fazemos alguma mudança relacionada a setup

# Scripts da Aplicação

- yarn start:dev (Server para iniciar o ambiente de desenvolvimento )

- husky:prepare (Criando arquivo de configuração do husky)

- test (Para se nao tiver nem um teste ele passar mesmo assim)

- test:watch( Teste que sera usado em ambiente dev)

- test:staged ( Script que sera executando com o lint-staged)

- build (Para bulida e compilar os arquivos TS )

- start ( Para iniciar o ambiente de produção)

- test:push ()

- As vezes quando o pre commit buga podemos analisar caso nao ouve erro mesmo e confirmamos que foi bug podemos usar o 'npx prettier --write .' corrigir os problemas de formato de todos os arquivos não formatados

# Possiveis bugs

- caso o husky buga voce pode reinstalar ele usando yarn husky:prepare e depois criando o pre-commit npx husky add .husky/pre-commit "yarn lint-staged"

- Caso o conventional commit nao esteja funcionando tbm pode reinstalar usando npx husky add .husky/commit-msg ".git/hooks/commit-msg \$1" verifica se ficou uma aspa dentro do arquivo .husky pre-commit e remova
