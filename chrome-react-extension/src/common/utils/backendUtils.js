const host = "http://localhost:8080";

export const getMemberAPI = async (id) => {
  const response = await fetch(`${host}/api/members/${id}`, {
    method: "GET",
  });

  if (response.status != 200) {
    return null;
  } else {
    const data = await response.json();
    return data;
  }
};

export const createMemberAPI = async (memberInfo) => {
  const response = await fetch(`${host}/api/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memberInfo),
  });

  if (response.status != 200) {
    return null;
  } else {
    const data = await response.json();
    return data;
  }
};

export const createSubscriptionAPI = async (id, subscriptions) => {
  const response = await fetch(`${host}/api/members/${id}/subscriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscriptions),
  });

  if (response.status != 200) {
    console.log("error : ", response);
  } else {
    console.log("create subscription success : ", response);
  }
};

export const countMemberLocationAPI = async (id, latitude, longitude) => {
  const data = {
    latitude: latitude,
    longitude: longitude,
  };

  const response = await fetch(`${host}/api/members/${id}/locations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.status == 200) {
    const data = await response.json();
    console.log("data : ", data);
    return data;
  } else {
    console.log("count member location fail");
  }
};
