"use server"

const get_download_link = async (link) => {

    const body = { "url": link };
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    };

    let response = await fetch(`${process.env.API_ENDPOINT}/get_download_link`, {
        method: "POST",
        headers,
        body: JSON.stringify(body)
    });
    let res_json = await response.json();

    return res_json;
}

export { get_download_link };