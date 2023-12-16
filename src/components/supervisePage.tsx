import { RobotOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Layout, Input, Button, List, Radio, Spin, Table, Flex } from "antd";
import { useState } from "react";
const { Header, Footer, Sider, Content } = Layout;
import store, { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { io } from "socket.io-client";
import {
  BACKEND_URL,
  FAILURE_PREFIX,
  LOGIN_FAILED,
  LOGIN_SUCCESS_PREFIX,
} from "../constants/string";


const SupervisePage = () => {
    const [inputValue, setInputValue] = useState("");
    const [count, setCount] = useState(0);

    useEffect(() => {
      const socket = io("http://127.0.0.1:2020",{transports: ['websocket']});
      socket.on("update", (data) => {
        console.log(data);
        setCount(data.count);
      });
      socket.on("connect", () => {
        console.log("connect:: ");
      });
      socket.on("disconnect",()=>{
        console.log("disconnect:: ");
      });
      // Cleanup function
      return () => {
        socket.disconnect();
      };
    }, []); 
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    const sendMessage = () => {
        if (inputValue === "") {
          return;
        }
        // TODO: link with backend
        setInputValue("");
    };

    const [tableData, setTableData] = useState<{key:number, type:string,paramList:string, description: string, state: string }[]>([
    {key:1,type:"click",paramList:"压缩",description:"Click 压缩",state:"Finish"},
    {key:2,type:"click",paramList:"压缩",description:"Click 压缩",state:"Finish"},
    {key:3,type:"click",paramList:"压缩",description:"Click 压缩",state:"Finish"},
    {key:4,type:"click",paramList:"压缩",description:"Click 压缩",state:"Finish"},
    {key:5,type:"click",paramList:"压缩",description:"Click 压缩",state:"Finish"},
    {key:6,type:"click",paramList:"压缩",description:"Click 压缩",state:"Finish"},
    {key:7,type:"click",paramList:"压缩",description:"Click 压缩",state:"Finish"},
    {key:8,type:"click",paramList:"压缩",description:"Click 压缩",state:"Finish"},
]); // 用于存储表格数据, 包括 步骤类型 步骤描述 步骤参数 执行状态

    const tableColumns = [
    { title: "步骤序号", dataIndex: "key",  width: 50},
    { title: "步骤类型", dataIndex: "type", width: 150 },
    { title: "步骤参数", dataIndex: "paramList",  width: 150},
    { title: "步骤描述", dataIndex: "description"},
    { title: "执行状态", dataIndex: "state", width: 100 },
    ]; // 表格列名

  return (
    <Layout style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Content style={{width:"calc(100% - 100px)"}}>
        <Flex vertical={false} style={{width:"100%", justifyContent:"center"}}>

        <Table
        style={{marginTop:"100px",width:"50%"}}
        columns={tableColumns}
        dataSource={tableData}
        pagination={false}
        scroll={{y: 340}}
        size="small"
        />
        <div style={{ width:"40%", marginTop: "100px", alignItems:"center",justifyContent:"center",textAlign:"center"}}>
          <h1>当前执行的操作</h1>
          <p>当前执行的操作内容</p>
          <p>Count: {count}</p>
        </div>
        </Flex>
      </Content>
      <Footer>
        <Flex vertical={false} style={{alignItems:"center", justifyContent:"center"}} gap="large">
        <div style={{fontSize:20}}>
            介入操作：
        </div>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onPressEnter={sendMessage}
          placeholder="请描述当前步骤正确的操作..."
          style={{ width: "600px", marginRight: "10px" ,height:"100px"}}
        />
        <Button onClick={sendMessage} style={{ width: "90px" }}>发送</Button>
        </Flex>
      </Footer>
    </Layout>
  );
};

export default SupervisePage;
