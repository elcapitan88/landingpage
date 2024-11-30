export const subscribeToWaitlist = async (email) => {
    try {
      const response = await fetch("/api/prelaunch/subscribe/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }
  
      return data;
    } catch (error) {
      throw error;
    }
  };