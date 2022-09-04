if(getToken() != null) {
    const userName = parseJwt(localStorage.getItem("token_menino_do_ti")).name;
    document.querySelector("#login").innerHTML = `
        <h5 class="lead my-2 mx-3">Olá, ${userName}</h5>
        <a>
            <button class="btn btn-outline-danger" onclick="deleteToken()">Logout</button>
        </a>
    `;
    document.querySelector("#ticket-link").disabled = false;
}
axios.get("/all_tickets")
    .then(res => {
        const tickets = res.data.msg;
        tickets.forEach(ticket => {
            console.log(`/department/${ticket.department}`);
            axios.get(`/department/${ticket.department}`)
                .then((data) => {
                    console.table(data.data.msg.name);
                    const card = `
                        <span data-bs-toggle="modal" data-bs-target="#TicketModal" id="${ticket.code}" onclick="updateModal(this.id)">
                            <div class="card my-2 p-2 ${ticket.state}">
                                <div class="card-body">
                                    <div class="card-title fw-bolder">
                                        ${data.data.msg.name}
                                    </div>
                                    <div class="card-text">
                                        ${ticket.description}
                                    </div>
                                </div>
                            </div>
                        </span>`;
                    if(ticket.state === "Aberto") {
                        document.querySelector("#tickets_abertos").innerHTML += card;
                    }
                    else if(ticket.state === "Manutencao") {
                        document.querySelector("#tickets_manutencao").innerHTML += card;
                    }
                    else if(ticket.state === "Fechado") {
                        document.querySelector("#tickets_fechados").innerHTML += card;
                    }
                });
        });
    }).catch((err) => {
        console.log(err.response.data.msg);
    });
const updateModal = (ticketId) => {
    axios.get(`/ticket/${ticketId}`)
        .then(res => {
            const ticket = res.data.msg;
            if(getToken() === null) {
                document.querySelector("#TicketModalLabel").innerHTML = `Ticket: ${ticket.code}`;
                document.querySelector("#modal-body").innerHTML = `
                    <p>Department: ${ticket.department}</p>
                    <p>Description: ${ticket.description}</p>
                    <p>Requester: ${ticket.requester}</p>
                    <p>State: ${ticket.state}</p>
                    <p>issuedAt: ${ticket.issuedAt}</p>
                `;
            } else {
                document.querySelector("#TicketModalLabel").innerHTML = `Update the Ticket`;
                document.querySelector("#update-ticket").disabled = false;
                document.querySelector("#delete-ticket").disabled = false;
                document.querySelector("#modal-body").innerHTML = `
                <div class="col-10 mx-auto text-start">
                    <form class="p-4 p-md-5 border bg-light rounded">
                        <div class="mb-3">
                            <input type="text" class="form-control form-control-lg" id="code" name="code"
                                placeholder="code" readonly value="${ticket.code}">
                            <label for="code" class="text-muted m-1">Ticket code.</label>
                        </div>
                        <div class="mb-3">
                            <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg" id="department" name="department" required></select>
                            <label for="department" class="text-muted m-1">Edit department.</label>
                        </div>
                        <div class="mb-3">
                            <input type="text" class="form-control form-control-lg" id="description" name="description"
                                placeholder="description" required value="${ticket.description}">
                            <label for="description" class="text-muted m-1">Edit description.</label>
                        </div>
                        <div class="mb-3">
                            <input type="text" class="form-control form-control-lg" id="requester" name="requester"
                                placeholder="requester" readonly value="${ticket.requester}">
                            <label for="requester" class="text-muted m-1">Requester.</label>
                        </div>
                        <div class="mb-3">
                            <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg" id="state" name="state" required>
                                <option ${(ticket.state === "Aberto") ? "selected" : ""} value="Aberto">Aberto</option>
                                <option ${(ticket.state === "Manutencao") ? "selected" : ""} value="Manutencao">Em Manutenção</option>
                                <option ${(ticket.state === "Fechado") ? "selected" : ""} value="Fechado">Fechado</option>
                            </select>
                            <label for="state" class="text-muted m-1">Edit state.</label>
                        </div>
                        <div class="mb-3">
                            <input type="text" class="form-control form-control-lg"
                                placeholder="IssuedAt" readonly value="${ticket.issuedAt}">
                            <label for="state" class="text-muted m-1">IssuedAt.</label>
                        </div>
                    </form>
                </div>
                `;
                axios.get("/all_departments")
                    .then(response => {
                        if(response.data.msg.length > 0) {
                            let departmentOptions = document.querySelector("#department");
                            response.data.msg.forEach(department => {
                                console.log(department);
                                departmentOptions.innerHTML += `
                                    <option ${(department.code === ticket.department) ? "selected" : ""} value="${department.code}">${department.name}</option>
                                `;
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }).catch((err) => {
            console.log(err.response.data.msg);
        });
}
const updateTicket = async () => {
    const form = document.querySelector("form");
    const formData = new FormData(form);
    const formDataJSON = Object.fromEntries(formData.entries());
    console.log(formDataJSON);

    axios({
        method: "PUT",
        url: `/ticket/${formDataJSON.code}`,
        data: JSON.stringify(formDataJSON),
        headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(res => {
        window.location.href = "/";
    }).catch((err) => {
        console.log(err.response.data.msg);
    });
}
const deleteTicket = async () => {
    const form = document.querySelector("form");
    const formData = new FormData(form);
    const formDataJSON = Object.fromEntries(formData.entries());
    console.log(formDataJSON);

    axios({
        method: "DELETE",
        url: `/ticket/${formDataJSON.code}`,
        data: JSON.stringify(formDataJSON),
        headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(res => {
        window.location.href = "/";
    }).catch((err) => {
        console.log(err.response.data.msg);
    });
}