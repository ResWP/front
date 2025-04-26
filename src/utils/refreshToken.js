let refreshInterval = null;

export const startRefreshTimer = (dispatch) => {
  // Clear any existing interval
  if (refreshInterval) clearInterval(refreshInterval);

  // Refresh function
  const refresh = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/refresh", {
        method: "POST",
        credentials: "include", // For cookies if using them
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Refresh failed");

      const data = await response.json();
      dispatch({ type: "REFRESH_SUCCESS", payload: data });
    } catch (error) {
      console.log("Refresh token error:", error);
      stopRefreshTimer();
      dispatch({ type: "LOGOUT" });
    }
  };

  // Run immediately and then every 10 minutes
  refresh();
  refreshInterval = setInterval(refresh, 10 * 60 * 1000); // 10 minutes
};

export const stopRefreshTimer = () => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
  }
};
