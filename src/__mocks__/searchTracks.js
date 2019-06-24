function searchTracks(q){
    return Promise.resolve({
        data:{
            tracks:{
                items:[{
                    name: q,
                    album: null,
                    artists: [{name: 'shakira'}],
                    preview_url: null,
                    id: "lkd234343kjl;jls"
                }]
            }
        }
    })
}