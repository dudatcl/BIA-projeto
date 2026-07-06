# Projeto Aurora — Protótipo
> 🏆 **2º lugar** do [HackaWoman](https://hackawoman.vercel.app/)


## O que é o Projeto?
Módulo de IA para detecção e acolhimento em casos de violência patrimonial, integrável a qualquer instituição financeira via API REST.

## Visão geral da arquitetura

```
App do banco (detecção de fraude)
        │  evento assíncrono
        ▼
   Fila de mensagens (Kafka / SQS)
        │
        ▼
 Gateway Aurora API (Magalu Cloud)
        │  {id anônimo, motivo}
        ▼
 Orquestrador RAG ──► Banco vetorial (pgvector/Chroma)
        │              cartilha + Lei Maria da Penha
        ▼
   VM Ollama (Phi-3, auto scaling)
        │
        ▼
   Resposta mascarada ──► Chat BIA no app
```

## Princípio de privacidade

O banco parceiro **nunca envia dados pessoais identificáveis** (nome, CPF, saldo, conta) para o Aurora. Apenas um ID anônimo de referência interna e o motivo do gatilho são transmitidos. Toda associação entre o ID e a identidade real da usuária permanece exclusivamente no sistema do banco.

## Especificação da API

### `POST /v1/trigger`

Dispara o fluxo de acolhimento quando o sistema de fraude do banco identifica um padrão suspeito.

**Request**
```json
{
  "id": "98765",
  "motivo": "saida_imediata_salario",
  "contexto": {
    "percentual_saida": 0.9,
    "canal": "pix",
    "recorrencia": "3_meses"
  }
}
```

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | string | Identificador anônimo gerado pelo banco (não reversível para dados reais no lado do Aurora) |
| `motivo` | string | Código do gatilho detectado (enum, ver tabela abaixo) |
| `contexto` | object | Metadados não identificáveis sobre o padrão detectado |

**Motivos suportados (enum)**

| Código | Descrição |
|---|---|
| `saida_imediata_salario` | Grande parte do salário sai logo após o crédito |
| `retencao_cartao` | Indício de retenção de cartão/documento por terceiro |
| `abertura_credito_nao_solicitada` | Contrato/cartão aberto sem confirmação clara da titular |
| `controle_acesso_conta` | Indício de terceiro controlando login/senha |

**Response**
```json
{
  "session_id": "aurora-sess-4471",
  "arvore_decisao": {
    "mensagem_inicial": "Oi, tudo bem? Passei rapidinho pra conversar sobre uma coisa que percebi.",
    "opcoes": [
      { "id": "sim_controle", "label": "Sim, eu decido como usar" },
      { "id": "quero_controle", "label": "Gostaria de ter mais controle" },
      { "id": "nao_falar", "label": "Não quero falar sobre isso" }
    ]
  },
  "rag_context_used": ["lei_maria_da_penha_art_7", "cartilha_sinais_controle_financeiro"]
}
```

### `POST /v1/session/{session_id}/respond`

Continua a conversa a partir de uma opção escolhida pela usuária no chat.

### `GET /v1/health`

Health check padrão para monitoramento do auto scaling.

## Critério de detecção (responsabilidade do banco)

A detecção do padrão suspeito é responsabilidade do banco parceiro, não do Aurora — o banco já possui a infraestrutura de antifraude e é o único com acesso aos dados brutos necessários para calcular o sinal. O Aurora define o **critério de referência** que cada banco adapta ao seu próprio motor de risco.

**Sinal de referência — concentração de saída por gênero**

- **Titular da conta**: mulher (cis ou trans), conforme gênero autodeclarado no cadastro.
- **Destinatário**: homem.
- **Threshold**: ≥ 80% do valor recebido (salário/benefício) saindo para esse destinatário, de forma recorrente em um curto intervalo após o crédito.

**Nível de confiança conforme o destinatário**

| Cenário | Confiança do sinal | Como tratar |
|---|---|---|
| Destinatário é correntista do mesmo banco | Alta — gênero cadastrado disponível | Sinal principal, dispara o gatilho diretamente |
| Destinatário é externo (Pix via DICT de outro banco) | Sinal comportamental apenas | Gênero do destinatário não é confiável (nome não deve ser usado para inferir gênero — é impreciso e pode ser ofensivo, especialmente para pessoas trans). Disparar com base só na concentração de 80% + recorrência + ausência de autonomia, sem exigir confirmação de gênero do destinatário |

Esse desenho evita dois problemas: deixar de proteger uma vítima só porque o destinatário está em outro banco, e fazer suposição de gênero por heurística de nome.

## Como um banco parceiro integra

1. O sistema de fraude/transações do banco publica um evento na própria fila interna quando detecta um padrão.
2. Um worker do banco consome esse evento, gera o `id` anônimo e chama `POST /v1/trigger` no gateway Aurora.
3. A resposta (árvore de decisão / conteúdo RAG) é exibida no app através do componente de chat já existente (ex: BIA).
4. Nenhuma chamada é bloqueante: o app do banco segue funcionando normalmente enquanto o Aurora processa em background.

## Stack sugerida (Magalu Cloud)

- **Fila**: serviço de mensageria gerenciado (Kafka ou equivalente)
- **Gateway/API**: container orquestrado com auto scaling horizontal
- **RAG**: Postgres + `pgvector` ou Chroma, hospedado em banco gerenciado
- **LLM**: VM(s) com Ollama + Phi-3, grupo de auto scaling baseado em fila de requisições pendentes
- **Object Storage**: armazenamento dos documentos-fonte (cartilha, legislação) usados na ingestão do RAG