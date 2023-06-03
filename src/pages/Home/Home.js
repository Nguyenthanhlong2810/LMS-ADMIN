import React from 'react';
import './Home.scss';
import homepageImg from 'assets/images/homepage.png';

const Home = () => {
  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Kết nối tri thức - Cùng thành công!</h1>
        <p className="detail">Tập đoàn Công nghệ CMC là tập đoàn số toàn cầu, đẳng cấp quốc tế.</p>
        <p>
          Thành lập từ năm 1993, CMC đã khẳng định vị thế trên thị trường Việt Nam và nhiều nước
          trên thế giới thông qua những hoạt động kinh doanh chủ lực ở 4 khối: Khối Công nghệ & Giải
          pháp (Technology & Solution), Khối Dịch vụ Viễn thông (Telecommunications), Khối Kinh
          doanh Quốc tế (Global Business) và Khối Nghiên cứu & Giáo dục (Research & Education).
        </p>
      </div>
      <div className="image">
        <img src={homepageImg} width="630px" />
      </div>
    </div>
  );
};

export default Home;
