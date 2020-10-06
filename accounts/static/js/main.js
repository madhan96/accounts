function getAgentsList() {
    getService(GET_AGENT_LIST, (response) => {
        console.log(response);
        let options = response.response.items || [];
        options.forEach((obj) => {
            let tempdiv = '<td>' + obj.id + '</td><td><span class="agentName " id="agentId-' + obj.id + '">' + obj.name + '</span></td>';
            $("<tr />", { "class": "agentsListRow" }).append(tempdiv).appendTo('#agentTable');

            $("#agentId-" + obj.id).click(getAgentDetails);
        })
    });
}

function getAgentDetails(event) {
    let agentId = event.currentTarget.id.substr(event.currentTarget.id.indexOf("-") + 1);

    getService(GET_AGENT_LIST + '/' + agentId, (response) => {
        console.log(response);
        let options = response.response.items || [];
        let data = options[0].data;
        renderAgentDetails(data);
    });
}

function renderAgentDetails(data) {
    $('#agentDetailsForm')[0].reset();

    let text_inputs = $('#agentDetailsForm :input[type=text]');
    text_inputs.each(function () {
        if (this.name in data) {
            let foundData = data[this.name];
            $(this).val(foundData);
        }
    });

    var checkbox_inputs = $('#agentDetailsForm :input[type=checkbox]');
    checkbox_inputs.each(function () {
        if (this.name in data) {
            if (String(data[this.name]).toLowerCase() == "yes" || String(data[this.name]).toLowerCase() == "1" || String(data[this.name]).toLowerCase() == "true") {
                $(this)[0].checked = "true";
            }
        }
    });

    var date_inputs = $('#agentDetailsForm :input[type=datetime]');
    date_inputs.each(function () {
        if (this.name in data) {
            let dateinSecs = data[this.name];
            let date = new Date(dateinSecs * 1000);
            let dateStr = date.toString("dd/MM/yyyy HH:mm:ss");

            $(this).val(dateStr);
        }
    });
}