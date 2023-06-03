import { Button, Typography } from '@mui/material';
import { BackButton, Title } from 'components';
import { Wrapper } from 'components/WrapBox';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import QuestionForm from './QuestionForm/QuestionForm';
import EditIcon from '@mui/icons-material/Edit';
import { DEFAULT_ERROR_MESSAGE, HTTP_STATUS, ROUTE_PATH } from 'consts';
import { useLoading } from 'hooks/LoadingProvider';
import { QuestionBankAPI } from 'apis/QuestionBank';
import { toast } from 'react-toastify';

const updateTitle = 'Chỉnh sửa câu hỏi';
const createTitle = 'tạo câu hỏi mới';
const detailTitle = 'Chi tiết câu hỏi';

const CreateUpdateQuestion = () => {
  const { hideLoading, showLoading } = useLoading();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const isDetail = location.pathname.includes('detail');
  const [detailQuestion, setDetailQuestion] = useState(location.state);
  let isOnlyView = params.getAll('onlyView')[0] === 'true';

  const getQuestionById = async (id) => {
    try {
      showLoading();
      const res = await QuestionBankAPI.getDetail(id);
      if (res && res.status === HTTP_STATUS.StatusOK) {
        setDetailQuestion(res.data.data);
      }
      hideLoading();
    } catch (error) {
      hideLoading();
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
  };
  useEffect(() => {
    if (id && !location.state) {
      getQuestionById(id);
    }
  }, []);

  return (
    <Wrapper>
      <div className="ml-3">
        {!isOnlyView && <BackButton onClick={() => navigate(ROUTE_PATH.QUESTION_BANK)} />}

        <div className="d-flex justify-content-space-between align-items-center ">
          <Title> {isDetail ? detailTitle : id ? updateTitle : createTitle} </Title>
          {isDetail && !isOnlyView && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              endIcon={<EditIcon fontSize="12px" />}
              onClick={() =>
                navigate(ROUTE_PATH.QUESTION_BANK_UPDATE + '/' + id, { state: detailQuestion })
              }>
              {updateTitle}
            </Button>
          )}
        </div>
        {id && (
          <Typography sx={{ fontWeight: 500 }}>
            Mã câu hỏi hệ thống : {detailQuestion?.codeSystem}
          </Typography>
        )}
      </div>
      <QuestionForm disabled={isDetail} detailQuestion={detailQuestion} />
    </Wrapper>
  );
};

export default CreateUpdateQuestion;
