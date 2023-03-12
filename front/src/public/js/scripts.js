if (d && d.length && ref === 'insert'){
    document.getElementById('page_title').innerHTML = 'Management';
    const data = d.filter(d => d.name !== undefined).map((d) => {
        return {
            delete: `<a href="http://localhost:3300/delete?id=${d._id}&rev=${d._rev}" class="btn btn-outline-warning">Delete</a>`,
            update: `<a href="http://localhost:3300/update?id=${d._id}" class="btn btn-outline-dark">Update</a>`,
            nome: d.name,
            age: d.age,
            email: d.email,
            nice: d.nice
        }
    })
    if (data.length > 0) {
        const table = `<table class="table"><tr><th>
                ${Object.keys(data[0]).join('<th>')}
                </th><tr><td>${data.map(e => Object.values(e).join('<td>')).join('<tr><td>')}</table>`
        const root = document.querySelector('div#root');
        root.innerHTML = table;
    }
} else if (d && ref === 'update') {
    console.log(d)
    document.getElementById('id').value = d._id;
    document.getElementById('rev').value = d._rev;
    document.getElementById('name').value = d.name;
    document.getElementById('email').value = d.email;
    document.getElementById('age').value = d.age;
    document.getElementById('nice').value = d.nice;
}
