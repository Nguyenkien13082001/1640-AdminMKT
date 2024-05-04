import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Text,
  PieChart,
  Cell,
  Pie,
} from "recharts";
import "../../style/dashBoard.css";
import { chart, fetchData, fetchDataFaculty } from "../../service/userService";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const DashBoard = () => {
  const options = {
    chart: {
      title: "Total likes and comments",
      subtitle: "Total likes and comments in an event",
    },
  };
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const [listData, setListData] = useState([]);
  const [perData, setPerData] = useState([]);
  const [total, setTotal] = useState([]);

  const getDataPost = async () => {
    try {
      let res = await fetchDataFaculty();
      let res2 = await fetchData();
      let res3 = await chart();
      console.log(res2);
      if (res !== null && res2 !== null && res3 !== null) {
        setListData(res);
        setPerData(res2);
        setTotal(res3);
      } else {
        console.error("No data received");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getDataPost();
  }, []);

  const filteredData = total.filter(
    (event) => event.totalLikes > 0 || event.totalComments > 0
  );
  const chartData = filteredData.map((event) => [
    event.eventName,
    event.totalLikes,
    event.totalComments,
  ]);
  chartData.unshift(["Event Name", "Total Likes", "Total Comments"]);

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>Dashboard</h3>
      </div>

      <div className="charts">
        <div className="chart-card">
          <ResponsiveContainer width="100%" height="100%">
            {/* <Text style={{color: "black"}}>Total posts in a faculty</Text> */}
            <BarChart
              width={500}
              height={300}
              data={listData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="faculty.faculty_name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalPosts" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <ResponsiveContainer width="100%" height="100%">
            <Text style={{ color: "black" }}>
              Percentage of post in a faculty
            </Text>
            <PieChart width={400} height={400}>
              <Pie
                data={perData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="percentage"
              >
                {perData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              {perData &&
                perData.length &&
                perData.map((item, index) => {
                  const yPosition = 20 + index * 15; // Tính toán vị trí y dựa trên index
                  const backgroundColor = COLORS[index % COLORS.length];
                  return (
                    <g key={index}>
                      <rect
                        x="94%"
                        y={`${yPosition - 5}%`} // Đặt vị trí y của background
                        width="20"
                        height="20" // Độ cao của background
                        fill={backgroundColor} // Màu nền của background
                        rx="5" // Bo tròn các góc của background
                      />
                      <text
                        x="85%"
                        y={`${yPosition}%`}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="black"
                        className="facultyM"
                        key={index}
                      >
                        {item.faculty.faculty_name}
                      </text>
                    </g>
                  );
                })}
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="chart-card">
        <Chart
          chartType="Bar"
          width="100%"
          height="400px"
          data={chartData}
          options={options}
        />
      </div>
    </main>
  );
};

export default DashBoard;
