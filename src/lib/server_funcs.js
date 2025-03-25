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

const get_user_profile = async (username) => {
    
    const body = { "profile_username": username };
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    };

    let response = await fetch(`${process.env.API_ENDPOINT}/instagram/get_profile_info`, {
        method: "POST",
        headers,
        body: JSON.stringify(body)
    });
    let res_json = await response.json();

    
    if (res_json["context"] !== "success") {
        throw new Error(res_json["reason"]);
    }
    
    res_json = res_json["data"];
    // console.log(res_json);
    let profile_data = {
        "user_id": res_json["id"],
        "username": res_json["username"],
        "full_name": res_json["full_name"],
        "profile_pic_url": res_json["profile_pic_url"],
        "biography": res_json["biography"],
        "external_url": res_json["external_url"],
        "followers": res_json["edge_followed_by"]["count"],
        "following": res_json["edge_follow"]["count"],
        "posts_count": res_json["edge_owner_to_timeline_media"]["count"],
        "category_name": res_json["category_name"],
        "is_verified": res_json["is_verified"],
    };

    return profile_data;
}

const get_user_reels = async (username, count) => {

    const body = { "profile_username": username, "reels_count": count };
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    };

    let response = await fetch(`${process.env.API_ENDPOINT}/instagram/get_profile_reels`, {
        method: "POST",
        headers,
        body: JSON.stringify(body)
    });
    let res_json = await response.json();

    
    if (res_json["context"] !== "success") {
        throw new Error(res_json["reason"]);
    }
    
    // console.log(res_json);

    res_json = res_json["data"]["reels"];
    let reels_data = [];

    for(let i=0; i<res_json.length; i++){
        const reel_data = res_json[i]["node"];
        // console.log(reel_data);
        reels_data.push({
            "code": reel_data["code"],
            "reel_id": reel_data["pk"],
            "caption": reel_data["caption"],
            "reel_url": reel_data["reel_url"],
            "creation_date": reel_data["taken_at"],
            "is_video": reel_data["video_versions"]? true : false,
            "video_data": reel_data["video_versions"]? reel_data["video_versions"][0] : null,
            "creator_data": {
                "pk": reel_data["user"]["pk"],
                "username": reel_data["user"]["username"],
                "profile_pic_url": reel_data["user"]["profile_pic_url"],
                "full_name": reel_data["user"]["full_name"],
            },
            "comment_count": reel_data["comment_count"],
            "like_count": reel_data["like_count"],
            "location": reel_data["location"],
            "reel_thumbnail_url": reel_data["image_versions2"]["candidates"][0]["url"],
        })
    };

    // console.log(reels_data);
    return reels_data;
}

export { get_download_link, get_user_profile, get_user_reels };