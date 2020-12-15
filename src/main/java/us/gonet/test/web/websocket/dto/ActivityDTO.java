package us.gonet.test.web.websocket.dto;

import java.time.Instant;

/**
 * DTO for storing a user's activity.
 */
public class ActivityDTO {

    private String sessionId;

    private String userLogin;
    
    private String userLoginDest;

    private String ipAddress;

    private String message;

    private Instant time;

    /**
     * @return the sessionId
     */
    public String getSessionId() {
        return sessionId;
    }

    /**
     * @param sessionId the sessionId to set
     */
    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    /**
     * @return the userLogin
     */
    public String getUserLogin() {
        return userLogin;
    }

    /**
     * @param userLogin the userLogin to set
     */
    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
    }

    /**
     * @return the userLoginDest
     */
    public String getUserLoginDest() {
        return userLoginDest;
    }

    /**
     * @param userLoginDest the userLoginDest to set
     */
    public void setUserLoginDest(String userLoginDest) {
        this.userLoginDest = userLoginDest;
    }

    /**
     * @return the ipAddress
     */
    public String getIpAddress() {
        return ipAddress;
    }

    /**
     * @param ipAddress the ipAddress to set
     */
    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    /**
     * @return the message
     */
    public String getMessage() {
        return message;
    }

    /**
     * @param message the message to set
     */
    public void setMessage(String message) {
        this.message = message;
    }

    /**
     * @return the time
     */
    public Instant getTime() {
        return time;
    }

    /**
     * @param time the time to set
     */
    public void setTime(Instant time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "ActivityDTO{" + "sessionId=" + sessionId + ", userLogin=" + userLogin + ", userLoginDest=" + userLoginDest + ", ipAddress=" + ipAddress + ", message=" + message + ", time=" + time + '}';
    }
  
    


}
