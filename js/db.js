// habilitar dados offline
db.enablePersistence()
    .catch(function(err) {
        if (err.code == 'failed-precondition') {
            // provavelmente multiplas abas abertas ao mesmo tempo
            console.log('Persistencia de dados falhou');
        } else if (err.code == 'unimplemented') {
            // browser nao suporta
            console.log('Persistencia nao disponivel');
        }
    });

// real-time listener que verifica as mudanças que ocorrem
db.collection('comidas').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
            desenhaCard(change.doc.data(), change.doc.id);
        }
        if (change.type === 'removed') {
            // remover da pagina tambem
        }
    });
});

// adicionar nova comida
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
    evt.preventDefault();

    const comida = {
        nome: form.comidaTitulo.value,
        descricao: form.comidaDescricao.value,
        link: form.comidaLink.value,
        endereco_imagem: form.comidaArquivo.value
    };

    db.collection('comidas').add(comida)
        .catch(err => console.log(err));

    //reseta o formulario
    form.comidaTitulo.value = '';
    form.comidaDescricao.value = '';
    form.comidaLink.value = '';
    form.comidaArquivo.value = '';

});
