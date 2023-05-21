import { Grid } from '@mui/material/index';
import parse from 'html-react-parser';

export const PostContent = () => {
    const text = `
    <article>
      <h1>Bài viết về Anime</h1>
      <p>
        Anime là một loại hình nghệ thuật hoạt hình phát triển từ Nhật Bản. Nó đã trở thành một phần không thể thiếu trong văn hóa đại chúng toàn cầu.
      </p>
      <p>
        Anime có thể đa dạng về thể loại, từ hành động, phiêu lưu, tình yêu, giả tưởng đến khoa học viễn tưởng và kinh dị. Nó thường mang tính chất biểu đạt tinh tế và đặc trưng riêng của nền văn hóa Nhật Bản.
      </p>
      <h2>Các bộ anime nổi tiếng</h2>
      <ul>
        <li>Naruto</li>
        <li>One Piece</li>
        <li>Attack on Titan</li>
        <li>Death Note</li>
        <li>Dragon Ball</li>
      </ul>
      <p>
        Những bộ anime nổi tiếng này đã thu hút hàng triệu người hâm mộ trên khắp thế giới. Chúng được đánh giá cao về cốt truyện, đồ họa, âm nhạc và nhân vật sâu sắc.
      </p>
      <p>
        Anime cũng có sức ảnh hưởng lớn đến các lĩnh vực khác như manga, cosplay và ngành công nghiệp giải trí. Các sự kiện anime, như hội chợ manga và buổi triển lãm cosplay, thu hút đông đảo người hâm mộ và tạo ra một cộng đồng đam mê anime vững mạnh.
      </p>
      <p>
        Với sự phát triển của internet, việc xem anime đã trở nên dễ dàng hơn bao giờ hết. Người hâm mộ có thể tận hưởng hàng trăm bộ anime trên các nền tảng trực tuyến và chia sẻ cảm xúc với cộng đồng trên mạng xã hội.
      </p>
      <p>
        Trên đây chỉ là một số ghi chú về anime. Nếu bạn quan tâm đến anime, hãy khám phá thêm để hiểu rõ hơn về thế giới này.
      </p>
    </article>
  `;

    const html = parse(text);

    return (
        <Grid container>
            <Grid item mb={2}>
                <img
                    style={{ width: '100%' }}
                    src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/01/anh-wibu.jpg?ssl=1"
                    alt="post-img"
                />
            </Grid>
            <Grid item mb={2}>
                {html}
            </Grid>
        </Grid>
    );
};
