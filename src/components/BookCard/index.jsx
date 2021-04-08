import styles from './index.less';
import React, { PureComponent } from 'react';
import minEmpty from '@/components/Empty/minEmpty';
import { Card, Button, Spin, Drawer } from 'antd';

// 实体语料回溯
class BookCard extends PureComponent {
  state = {
    visible: false,
    drawer: [],
  };

  showDrawer = (e) => {
    const { substance } = this.props;
    const drawerData = substance[e.currentTarget.value];
    this.setState({
      drawer: drawerData,
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { loading, substance } = this.props;
    const { visible, drawer } = this.state;
    const tip = substance.length > 0 ? substance[0].num : '';
    return (
      <div>
        <Spin spinning={loading}>
          {substance.length > 0 ? (
            <div className={styles.substanceDiv}>
              <Card size="small" title={tip}>
                {substance.map((item, index) => {
                  return (
                    <Card hoverable key={index}>
                      <div className={styles.bookImage}>
                        <img
                          style={{ height: '100px' }}
                          src={`http://gzknowledge.cn:2222/book/${item.bookName}${item.bookAuthor}.png`}
                        />
                      </div>
                      <p>{item.bookName}</p>
                      <p>简介</p>
                      <Button type={'primary'} value={index} onClick={this.showDrawer}>
                        查看详情
                      </Button>
                    </Card>
                  );
                })}
              </Card>
            </div>
          ) : (
            minEmpty
          )}
        </Spin>
        <Drawer
          title={drawer.bookName}
          placement="left"
          closable={false}
          width={'50%'}
          onClose={this.onClose}
          visible={visible}
        >
          <p
            style={{ letterSpacing: '1px' }}
            dangerouslySetInnerHTML={{ __html: drawer.bookContent }}
          />
        </Drawer>
      </div>
    );
  }
}

export default BookCard;
