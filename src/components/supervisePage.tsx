import { RobotOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Layout,
  Input,
  Button,
  List,
  Radio,
  Spin,
  Table,
  Flex,
} from "antd";
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
  const [init, setInit] = useState(false); // 是否已经初始化
  const [currentStep, setCurrentStep] = useState(0); // 当前执行的步骤
  const [count, setCount] = useState(0);
  const [sendButtonDisabled, setSendButtonDisabled] = useState(false); // 是否可以发送介入操作
  const [needFix, setNeedFix] = useState(false); // 是否需要介入
  const [tableData, setTableData] = useState<
    {
      key: number;
      type: string;
      parameterList: string;
      description: string;
      state: string;
    }[]
  >([
    // {
    //   key: 1,
    //   type: "click",
    //   parameterList: "压缩",
    //   description: "Click 压缩",
    //   state: "Finish",
    // },
    // {
    //   key: 2,
    //   type: "click",
    //   parameterList: "压缩",
    //   description: "Click 压缩",
    //   state: "Finish",
    // },
    // {
    //   key: 3,
    //   type: "click",
    //   parameterList: "压缩",
    //   description: "Click 压缩",
    //   state: "Finish",
    // },
    // {
    //   key: 4,
    //   type: "click",
    //   parameterList: "压缩",
    //   description: "Click 压缩",
    //   state: "Finish",
    // },
    // {
    //   key: 5,
    //   type: "click",
    //   parameterList: "压缩",
    //   description: "Click 压缩",
    //   state: "Finish",
    // },
    // {
    //   key: 6,
    //   type: "click",
    //   parameterList: "压缩",
    //   description: "Click 压缩",
    //   state: "Finish",
    // },
    // {
    //   key: 7,
    //   type: "click",
    //   parameterList: "压缩",
    //   description: "Click 压缩",
    //   state: "Finish",
    // },
    // {
    //   key: 8,
    //   type: "click",
    //   parameterList: "压缩",
    //   description: "Click 压缩",
    //   state: "Finish",
    // },
  ]); // 用于存储表格数据, 包括 步骤类型 步骤描述 步骤参数 执行状态
  useEffect(() => {
    const socket = io("http://127.0.0.1:2020", { transports: ["websocket"] });
    socket.on("steps_info", (data: any) => {
      const steps = data.steps;
      for (let i = 0; i < steps.length; i++) {
        steps[i].key = i;
      }
      setTableData(steps);
      const currentStep = data.current_index;
      setCurrentStep(currentStep);
    });
    socket.on("need_fix", (data: any) => {
      setNeedFix(true);
      setSendButtonDisabled(false);
    });
    socket.on("connect", () => {
      console.log("connect:: ");
    });
    socket.on("disconnect", () => {
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
    if (init) {
      setSendButtonDisabled(true);
      setInputValue("");
      const formdata = new FormData();
      formdata.append("index", currentStep.toString());
      formdata.append("message", inputValue);
      // TODO: link with backend
      fetch(`${BACKEND_URL}/receive_fix`, {
        method: "POST",
        body: formdata,
        mode: "cors",
      }).then((res) => {});
    }
    else {
      setSendButtonDisabled(true);
      setInit(true);
      setInputValue("");
      const formdata = new FormData();
      formdata.append("original_text", inputValue);
      fetch(`${BACKEND_URL}/start`, {
        method: "POST",
        body: formdata,
        mode: "cors",
      }).then((res) => {});
    }
  };

  const tableColumns = [
    { title: "步骤序号", dataIndex: "key", width: 50 },
    { title: "步骤类型", dataIndex: "type", width: 150 },
    { title: "步骤参数", dataIndex: "parameterList", width: 150 },
    { title: "步骤描述", dataIndex: "description" },
    { title: "执行状态", dataIndex: "state", width: 100 },
  ]; // 表格列名

  return (
    <Layout
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <Content style={{ width: "calc(100% - 100px)" }}>
        <Flex
          vertical={false}
          style={{ width: "100%", justifyContent: "center" }}
        >
          <Table
            style={{ marginTop: "100px", width: "50%" }}
            columns={tableColumns}
            dataSource={tableData}
            pagination={false}
            scroll={{ y: 340 }}
            size="small"
          />
          <div
            style={{
              width: "40%",
              marginTop: "100px",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <h1>当前执行的操作步骤: {tableData.at(currentStep)?.key}</h1>
            <p>当前执行的操作内容：{tableData.at(currentStep)?.description}</p>
            <p>当前执行的操作状态：{tableData.at(currentStep)?.state}</p>
          </div>
        </Flex>
      </Content>
      <Footer>
        <Flex
          vertical={false}
          style={{ alignItems: "center", justifyContent: "center" }}
          gap="large"
        >
          <div style={{ fontSize: 20 }}>介入操作：</div>
          <Input
            value={inputValue}
            onChange={handleInputChange}
            onPressEnter={sendMessage}
            placeholder={
              init ? "请描述当前步骤正确的操作..." : "请输入要执行的操作..."
            }
            style={{ width: "600px", marginRight: "10px", height: "100px" }}
          />
          <Button
            onClick={sendMessage}
            disabled={sendButtonDisabled}
            style={{ width: "90px" }}
          >
            发送
          </Button>
        </Flex>
      </Footer>
    </Layout>
  );
};

export default SupervisePage;
