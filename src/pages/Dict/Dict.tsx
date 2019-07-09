import React from 'react';
import { Row, Col } from 'antd';

import { DictClassify } from './DictClassify';
import { DictProvider } from "./context";
import { DictDetail } from "./DictDetail";
import styles from './Dict.module.scss';

const Dict: React.FC = () => {
  return (
    <DictProvider>
      <div className={styles.container}>
        <Row gutter={10}>
          <Col span={8}>
            <DictClassify />
          </Col>
          <Col span={16}>
            <DictDetail />
          </Col>
        </Row>
      </div>
    </DictProvider>
  )
};

export { Dict }
