import { Grid, Typography } from '@mui/material/index';
import { styled } from '@mui/material/styles';

const TitlePostTypography = styled(Typography)`
    &:hover {
        color: #1890ff;
        cursor: pointer;
    }
`;

export const PostSidebar = () => {
    const postTitles = [
        'Anime: Một nghệ thuật hoạt hình phát triển từ Nhật Bản',
        'Các thể loại anime phổ biến và đa dạng',
        'Top 5 bộ anime nổi tiếng mà bạn không nên bỏ qua',
        'Sức ảnh hưởng của anime đến văn hóa đại chúng',
        'Anime và các lĩnh vực liên quan: Manga, cosplay và ngành công nghiệp giải trí',
        'Sự phát triển của việc xem anime trực tuyến và sự lan rộng của cộng đồng người hâm mộ'
    ];

    return (
        <Grid container pl={8}>
            <Grid item mb={2}>
                <Typography variant="h3" sx={{ borderBottom: '3px solid #1890ff' }}>
                    Bài viết mới
                </Typography>
            </Grid>
            {postTitles.map((e) => (
                <Grid item mb={3}>
                    <TitlePostTypography variant="h5">{e}</TitlePostTypography>
                </Grid>
            ))}
        </Grid>
    );
};
