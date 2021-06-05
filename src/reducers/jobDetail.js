var initialState = {
    id: 1,
    org_id: 6,
    author_id: 1,
    major_id: 3,
    title: "Fulltime ReactJS",
    content: "Cần tuyển Provident voluptatem velit qui. Fugiat consequatur voluptatem maxime illo excepturi et hic.",
    address: "19, Ấp Nhân Linh, Xã Tiêu Lộc Chiêu, Huyện Ngân\nCao Bằng",
    city: "Cần Thơ",
    work_type: "Part-time",
    start_time: "2021-05-16 04:51:06",
    end_time: "2021-05-21 04:51:06",
    interview_start_time: "2021-05-22 04:51:06",
    interview_end_time: "2021-05-26 04:51:06",
    created_at: "2021-05-16 04:51:06",
    updated_at: "2021-05-16 04:51:06",
    major: {
        id: 3,
        major_name: "BrSE",
        image_path: "./public/images/major.png",
        created_at: null,
        updated_at: null
    }
}

const jobDetail = (state = initialState, action) => {
    switch (action.type) {
        default: return state;
    }
}

export default jobDetail;