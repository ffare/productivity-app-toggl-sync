const email = "faresbenlakdher@gmail.com";
const password = "Toggl.52916964";
const defaultWorkspaceId = "21130906";
const apiToken = "0452cca0e20861fc0cf4353913304cb5";

async function getToggleTimeEntries() {
    try {
        const response = await fetch("http://localhost:8010/proxy/api/v9/me/time_entries/current", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${btoa(`${apiToken}:api_token`)}`
            }
        });

        const jsonData = await response.json();
        return jsonData;
    }
    catch(err) {
        console.error(err);
    }
}

async function stopToggleTimeEntry() {  
    // fetch the time entry id first
    const json = await getToggleTimeEntries();
    const timeEntryId = json.id;

    try {
        const response = await fetch(`http://localhost:8010/proxy/api/v9/workspaces/${defaultWorkspaceId}/time_entries/${timeEntryId}/stop`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${btoa(`${apiToken}:api_token`)}`
            }
        });

        console.log(`${timeEntryId} was stopped successfully.`);
    }
    catch(err) {
        console.error(err);
    }
}

async function getTogglMe() {
    await fetch("http://localhost:8010/proxy/api/v9/me", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${btoa(`${apiToken}:api_token`)}`
        }
    })
    .then((resp) => resp.json())
    .then((json) => {
        console.log(json);
    })
    .catch(err => console.error(err));
}

async function postToggl(tag) {
    const timeNowISO = new Date().toISOString();

    await fetch("http://localhost:8010/proxy/api/v9/workspaces/21130906/time_entries", {
        method: "POST",        
        body: JSON.stringify({
            "billable":false,
            "created_with":"productivity-app-toggl",
            "description":"",
            "duration":-1,
            // "duronly":"boolean",
            // "event_metadata":{"origin_feature":"string","visible_goals_count":"integer"},
            // "expense_ids":[{}],
            // "pid":"integer",
            // "project_id":"integer",
            // "shared_with_user_ids":[{}],
            "start":timeNowISO,
            // "start_date":"string",
            // "stop":null,
            // "tag_action":"string",
            // "tag_ids":[{}],
            "tags":[tag],
            // "task_id":"integer",
            // "tid":"integer",
            // "uid":"integer",
            // "user_id":"integer",
            // "wid":"integer",
            "workspace_id": 21130906
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${btoa(`${email}:${password}`)}`
        }
    })
    .then((resp) => resp.json)
    .then((json) => {
        console.log(json);
    })
    .catch((err) => console.error(err));
}