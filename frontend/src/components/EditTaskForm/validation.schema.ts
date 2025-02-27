import * as Yup from 'yup';

const taskCreationvalidationSchema = Yup.object({
  title: Yup.string()
    .required('Você deve dar um título para a tarefa')
    .min(4, 'O título deve ter pelo menos 4 caracteres')
    .max(150, 'O título não deve ter mais que 150 caracteres'),
  description: Yup.string()
    .required('Você deve preencher o campo descrição')
    .min(4, 'A descrição deve ter pelo menos 4 caracteres')
    .max(400, 'A descrição deve ter no máximo 400 caracteres'),
  status: Yup.string()
    .oneOf(['pendente', 'em progresso', 'concluida'], 'Status inválido')
    .required('Você deve preencher o status'),
});

export default taskCreationvalidationSchema;
