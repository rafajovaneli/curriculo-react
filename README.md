# Rafael Jovaneli - Currículo

Currículo/portfólio em React, publicado em https://rafaeljovaneli.surge.sh.

## Stack

- React 18 com Create React App (`react-scripts` 5)
- Framer Motion (animações)
- Font Awesome 6 (ícones)
- React Helmet Async (SEO)
- React Testing Library (testes)

## Requisitos

- Node.js 18 ou superior (o arquivo `.nvmrc` indica a versão 20)

## Scripts

| Comando | O que faz |
| --- | --- |
| `npm ci` | instala as dependências exatamente como no `package-lock.json` |
| `npm start` | servidor de desenvolvimento |
| `npm test` | testes em modo interativo (`CI=true npm test -- --watchAll=false` roda uma vez) |
| `npm run build` | build de produção na pasta `build/` (assume que o site fica na raiz do domínio) |
| `npm run deploy:surge` | gera o build, cria o `200.html` e publica no Surge |

## Estrutura

- `src/App.js`: composição da página (cabeçalho, navegação e seções)
- `src/components`: seções e componentes reutilizáveis
- `src/contexts/LanguageContext.js`: textos em PT-BR e EN, detecção e persistência do idioma
- `src/hooks`: tema, scroll e animação
- `public`: PDFs do currículo, sitemap, `robots.txt`, manifesto e ícones

## Idioma e tema

- O idioma inicial vem da escolha salva no navegador (`localStorage`) ou, na primeira visita, do idioma do navegador (português se for `pt`, inglês nos demais).
- O tema segue a preferência do sistema e pode ser alternado entre automático, claro e escuro.

## Deploy no Surge

1. Faça login uma vez: `npx surge login`.
2. Publique com `npm run deploy:surge`.
3. O domínio está fixado em `public/CNAME` e no script `deploy:surge`.

Depois de publicar, confira se os PDFs respondem como `application/pdf`:

```
curl -sI https://rafaeljovaneli.surge.sh/CV_RAFAEL_JOVANELI_PT.pdf | grep -i content-type
```

## Segurança e privacidade

- É um site estático: não tem backend, formulário, cookies nem analytics.
- Telefone, e-mail e cidade são públicos por escolha do autor (é um currículo).
- O Surge não permite configurar cabeçalhos HTTP (CSP, X-Frame-Options, HSTS). Para ter esses cabeçalhos seria preciso migrar para uma hospedagem que aceite um arquivo `_headers`, como Cloudflare Pages ou Netlify.
- Os mapas de código-fonte ficam desligados no build (`.env.production`).
