package com.web.chat;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import net.sf.json.JSONObject;

/**
 * WebChat Server
 * @author Helios
 *
 */

@ServerEndpoint("/websocket")
public class ChatServer {
	private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd HH:mm");
	private static Set<Session> sets = new HashSet<Session>();
	
	@OnOpen
	public void open(Session session){
		//添加初始化操作
		sets.add(session);
		System.out.println("有人进入了聊天室，当前在线人数：" + sets.size());
		String msg = "***进入了聊天室";
		broadcast(msg);
	}
	
	/**
	 * 接收客户端消息，并且把消息发送给所有连接的会话
	 * @param message 客户端发来的消息
	 * @param session 客户端的会话
	 */
	@OnMessage
	public void getMessage(String message, Session session){
		// 把客户端的消息解析为JSON对象
		JSONObject jsonObject = JSONObject.fromObject(message);
		// 在消息中添加发送日期
		jsonObject.put("date", DATE_FORMAT.format(new Date()));
		// 把消息发送给所有连接的会话
		for (Session openSession : sets){
			// 添加本条消息是否为当前会话本身发的标志
			jsonObject.put("isSelf", openSession.equals(session));
			// 发送JSON格式的消息
			openSession.getAsyncRemote().sendText(jsonObject.toString());
		}
	}
	
	@OnClose
	public void close(Session session){
		// 添加关闭会话时的操作
		sets.remove(session);
		System.out.println("有人离开了聊天室，当前在线人数：" + sets.size());
	}
	
	@OnError
	public void error(Throwable t){
		// 添加处理错误的操作
	}
	
	public static void broadcast(String msg){
		for (Session session : sets) {
            try {
                synchronized (session) {
                    session.getBasicRemote().sendText(msg);
                }
            } catch (IOException e) {
            	System.out.println("Chat Error: Failed to send message to client");
                sets.remove(session);
                try {
                    session.close();
                } catch (IOException e1) {
                    // Ignore
                }
                String message = "Someone has been disconnected.";
                broadcast(message);
            }
        }
	}
	
}
