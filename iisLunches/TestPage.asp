<html>
    <head>
    <h1>TestPage</h1>
    </head>
<body>
<table border="1">
    <tr>
      <td>Server Name</td>
      <td><%=Request.ServerVariables("SERVER_NAME")%></td>
   </tr>
    <tr>
      <td>Local IP Address</td>
      <td><%=Request.ServerVariables("LOCAL_ADDR")%></td>
   </tr>
   <tr>
      <td>ALL_HTTP server variable:</td>
      <td><%=Request.ServerVariables("ALL_HTTP")%></td>
   </tr>
   <tr>
      <td>CONTENT_LENGTH server variable:</td>
      <td><%=Request.ServerVariables("CONTENT_LENGTH")%></td>
   </tr>
   <tr>
      <td>CONTENT_TYPE server variable:</td>
      <td><%=Request.ServerVariables("CONTENT_TYPE")%></td>
   </tr>
   <tr>
      <td>QUERY_STRING server variable:</td>
      <td><%=Request.ServerVariables("QUERY_STRING")%></td>
   </tr>
   <tr>
      <td>SERVER_SOFTWARE server variable:</td>
      <td><%=Request.ServerVariables("SERVER_SOFTWARE")%></td>
   </tr>
</table>
</body>
</html>
