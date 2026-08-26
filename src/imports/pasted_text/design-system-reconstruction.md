# RECONSTRUÇÃO FORENSE DO DESIGN SYSTEM

Você não está criando uma página bonita sobre um Design System.

Você está realizando uma **engenharia reversa do sistema visual de um site existente**.

A página `/design-system` deve funcionar como uma **fonte técnica de verdade** capaz de explicar exatamente como a interface foi construída.

O resultado precisa ser útil para um designer ou desenvolvedor que nunca viu o site conseguir reconstruir novas páginas mantendo a mesma linguagem visual.

## REGRA FUNDAMENTAL

Não faça uma apresentação.

Não faça um moodboard.

Não faça uma galeria genérica.

Não faça uma lista superficial de componentes.

Não invente componentes.

Não transforme valores em categorias arbitrárias.

Não simplifique informações importantes.

**Extraia o sistema real existente.**

---

# 01. PRIMEIRO: AUDITE O SITE

Antes de criar qualquer documentação, percorra todo o site disponível.

Analise todas as páginas e todas as interfaces existentes.

Para cada elemento visual encontrado, registre:

* Página
* Seção
* Elemento
* Componente provável
* Variante
* Estado
* Desktop/mobile
* Valores visuais
* Relação com outros elementos
* Frequência de ocorrência

Crie mentalmente uma matriz:

`ELEMENTO → OCORRÊNCIAS → PADRÃO → TOKEN → COMPONENTE`

Não documente nada antes dessa análise.

---

# 02. EXTRAIA OS TOKENS REAIS

O Design System precisa começar pelos fundamentos.

## COLORS

Não mostre apenas quadrados coloridos.

Para cada cor:

* Nome original, quando existir
* HEX
* RGB
* HSL
* CSS variable, quando existir
* Frequência de uso
* Contexto
* Contraste
* Elementos que utilizam

Exemplo:

Primary

`#111111`

Used in:

* Buttons
* Headings
* Navigation
* Borders

Se duas cores forem visualmente próximas, mas tiverem valores diferentes, mantenha as duas.

Não faça deduplicação automática.

---

# 03. TYPOGRAPHY

Reconstrua a hierarquia tipográfica real.

Para cada estilo:

* Font family
* Font source
* Weight
* Size
* Line-height
* Letter-spacing
* Text-transform
* Color
* Uso

Mostre o texto real renderizado.

Não mostre apenas:

`H1 / 64px`

Mostre:

# Heading Example

E ao lado:

Font: Inter
Weight: 700
Size: 64px
Line-height: 1.05
Letter-spacing: -0.03em

Faça isso para todos os padrões encontrados.

---

# 04. SPACING SYSTEM

Não invente uma escala.

Descubra os valores reais.

Analise:

* Section padding
* Container padding
* Grid gaps
* Card gaps
* Text spacing
* Button padding
* Component spacing
* Vertical rhythm

Depois identifique recorrências.

Se existir uma escala real, documente:

4
8
12
16
24
32
48
64
80
96
128

Mas não crie valores apenas para "completar" a escala.

---

# 05. LAYOUT SYSTEM

Essa parte é obrigatória.

Documente:

## Container

* Max width
* Minimum width
* Horizontal padding
* Behavior

## Grid

* Number of columns
* Column width
* Gap
* Alignment

## Sections

* Vertical spacing
* Width
* Alignment
* Content positioning

## Responsive

Mostre visualmente como o layout muda entre:

Mobile
Tablet
Desktop
Large Desktop

Não basta escrever os breakpoints.

**Mostre o comportamento.**

---

# 06. COMPONENT INVENTORY

Crie um inventário completo.

Para cada componente encontrado:

### COMPONENT NAME

Exemplo:

`Button`

### ANATOMY

Mostre visualmente:

`[ Icon ] [ Label ] [ Icon ]`

### VARIANTS

Mostre todas as variantes reais lado a lado.

Primary
Secondary
Outline
Ghost

Somente se existirem.

### SIZES

Small
Medium
Large

Somente se existirem.

### STATES

Default
Hover
Active
Focus
Disabled
Loading

Somente se existirem.

### TOKENS

Liste os tokens utilizados.

Example:

Background: `color.primary`
Text: `color.white`
Radius: `radius.md`
Padding: `spacing.sm spacing.md`
Typography: `button.md`

---

# 07. NÃO DOCUMENTE COMPONENTES COMO CARDS ESTÁTICOS

Este é um ponto crítico.

A documentação precisa permitir **comparação visual**.

Em vez de:

Card

[imagem de card]

Faça:

CARD

| Variant  | Default | Hover  | Active |
| -------- | ------- | ------ | ------ |
| Standard | render  | render | render |
| Featured | render  | render | render |

Se não houver determinado estado, não invente.

---

# 08. COMPONENTES PRECISAM SER INTERATIVOS

Quando fizer sentido, transforme a documentação em uma pequena biblioteca interativa.

Exemplo:

### Button

Variant:

`[ Primary ▼ ]`

Size:

`[ Medium ▼ ]`

State:

`[ Default ▼ ]`

Ao alterar os controles, o componente deve mudar visualmente.

Faça isso para componentes que tenham múltiplas propriedades.

O objetivo é transformar a documentação em uma ferramenta de exploração do sistema.

---

# 09. TOKENS DEVEM SER COPIÁVEIS

Todo valor técnico deve poder ser copiado.

Exemplo:

Primary

`#171717`

[Copy]

Radius Medium

`12px`

[Copy]

Spacing Large

`32px`

[Copy]

CSS:

`border-radius: 12px;`

[Copy]

Não esconda os valores técnicos.

---

# 10. MOSTRE O TOKEN E SUA APLICAÇÃO

Não documente tokens isoladamente.

Mostre:

TOKEN

`radius-lg`

`16px`

Used in:

[Card]

[Modal]

[Button]

Isso demonstra a relação entre foundation e component.

---

# 11. BORDER RADIUS

Crie uma escala visual real.

Para cada valor:

Radius

`0px`

[example]

Radius

`4px`

[example]

Radius

`8px`

[example]

Radius

`16px`

[example]

Radius

`9999px`

[example]

Somente valores encontrados.

---

# 12. SHADOWS

Faça exatamente o mesmo.

Mostre a sombra aplicada em um componente real.

Não mostre apenas:

`box-shadow: ...`

Mostre:

[Component with shadow]

E ao lado o valor completo.

---

# 13. ICONOGRAPHY

Crie uma biblioteca visual.

Cada ícone deve mostrar:

[ICON]

Name
Size
Stroke
ViewBox
Color

Se houver uma biblioteca identificável, informe qual.

Se os ícones forem customizados, documente como custom.

---

# 14. IMAGERY

Documente:

* Aspect ratios
* Crop
* Radius
* Overlay
* Object positioning
* Image behavior
* Mobile behavior

Mostre exemplos reais.

---

# 15. MOTION

Não escreva apenas "animações suaves".

Extraia:

Duration
Delay
Easing
Transform
Opacity
Scale
Translate

Mostre exemplos.

Se possível, crie um pequeno botão:

`Replay`

para visualizar a animação.

---

# 16. PATTERNS

Essa seção é extremamente importante.

Componentes individuais não explicam como o site é construído.

Documente padrões como:

Hero
Section header
Content section
CTA section
Feature grid
Card grid
Navigation pattern
Footer pattern
Form pattern
Editorial layout
Image + text layout

Para cada Pattern:

1. Mostre a composição completa.
2. Identifique os componentes utilizados.
3. Identifique os tokens utilizados.
4. Mostre as regras de espaçamento.
5. Mostre o comportamento responsivo.

---

# 17. REAL EXAMPLES

Sempre que possível, utilize elementos reais do próprio site.

Não crie exemplos genéricos como:

"Lorem ipsum"

"Button"

"Card"

Se existe um botão real no site, reproduza esse botão.

Se existe um card real, reproduza esse card.

Se existe um Hero real, utilize a composição real.

A documentação deve parecer uma dissecação do próprio site.

---

# 18. BEFORE / AFTER NÃO É NECESSÁRIO

Não faça redesign.

Não mostre "improved version".

Não faça recomendações de UX.

Não altere o sistema.

O objetivo é documentar o estado atual.

---

# 19. INCONSISTÊNCIAS

Crie uma seção específica:

# System inconsistencies

Documente divergências reais.

Exemplo:

### Button Radius

Button A

`8px`

Button B

`12px`

Button C

`999px`

Occurrences:

Homepage
Pricing
Contact

Não escolha um vencedor.

A documentação deve mostrar a realidade.

---

# 20. DESIGN SYSTEM HEALTH

No final, crie uma análise objetiva.

Classifique:

Token consistency
Typography consistency
Spacing consistency
Color consistency
Component consistency
Responsive consistency

Use:

Consistent
Mostly consistent
Inconsistent
Unknown

Explique brevemente cada avaliação.

---

# 21. TECHNICAL SOURCE

Crie uma seção:

# Technical source

Documente de onde cada informação veio.

Exemplo:

CSS variable
Computed style
Component source
DOM inspection
Repeated visual pattern
Inferred

Cada token importante deve possuir uma origem.

---

# 22. ESTRUTURA DA PÁGINA

A página final deve seguir esta arquitetura:

# Design System

## Overview

## Design Tokens

### Colors

### Typography

### Spacing

### Grid

### Breakpoints

### Radius

### Borders

### Shadows

### Motion

## Components

### Buttons

### Inputs

### Forms

### Navigation

### Cards

### Badges

### Feedback

### Icons

### Outros

## Patterns

### Hero

### Sections

### Grids

### CTA

### Content layouts

### Outros

## Responsive

## Inconsistencies

## Technical Source

## Extraction Notes

---

# 23. SIDEBAR

Crie uma navegação lateral fixa.

Ao clicar em uma categoria, a página deve navegar diretamente para a seção correspondente.

Exemplo:

FOUNDATIONS

Colors
Typography
Spacing
Grid
Radius

COMPONENTS

Buttons
Inputs
Cards
Navigation
Forms

PATTERNS

Hero
Sections
CTA
Layouts

AUDIT

Responsive
Inconsistencies
Technical Source

---

# 24. BUSCA

Adicione uma busca global.

O usuário deve conseguir pesquisar:

`button`

`#000`

`radius`

`32px`

`heading`

`card`

E encontrar os elementos correspondentes.

---

# 25. COPIAR VALORES

Todos os valores técnicos devem possuir ação:

`Copy`

Ao copiar, mostrar confirmação visual.

---

# 26. RESPONSIVE PREVIEW

Para componentes e padrões responsivos, disponibilize:

`Mobile`

`Tablet`

`Desktop`

Permita alternar entre os modos.

---

# 27. PRECISÃO VISUAL

A documentação deve utilizar os mesmos:

* Fontes
* Cores
* Radius
* Shadows
* Spacing
* Components
* Grid
* Motion

do site analisado.

**A página de documentação deve parecer que pertence ao próprio produto.**

---

# 28. REGRA CONTRA ALUCINAÇÃO

Se não encontrou:

Não invente.

Se não conseguiu medir:

Não estime.

Se encontrou valores diferentes:

Não normalize.

Se não sabe a origem:

Marque como `Inferred`.

Se existe apenas uma ocorrência:

Não transforme automaticamente em token global.

---

# 29. REGRA FINAL

Antes de considerar o trabalho concluído, faça esta pergunta:

> "Um designer conseguiria construir uma nova página deste site apenas utilizando esta documentação?"

Se a resposta for não, a documentação está incompleta.

A página final não deve ser apenas uma vitrine do Design System.

Ela deve ser uma **reconstrução documentada do sistema que governa a interface**.

O resultado esperado é:

SITE ORIGINAL

↓

AUDITORIA

↓

TOKENS

↓

COMPONENTES

↓

VARIANTES

↓

ESTADOS

↓

PATTERNS

↓

RESPONSIVIDADE

↓

REGRAS

↓

DOCUMENTAÇÃO

A documentação deve ser suficientemente precisa para permitir a reconstrução de uma nova interface sem precisar voltar ao site original para descobrir como cada elemento funciona.
