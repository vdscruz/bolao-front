import React from 'react';
import { Div, Text, Icon, Button } from 'atomize';

const BolaoItem = () => {
  return (
    <>
      <Div bg="surface" shadow="2" rounded="xl" m={{ b: '1rem' }} p="1.5rem">
        <Div
          border={{ b: '1px solid' }}
          borderColor="gray300"
          p={{ b: '0.75rem' }}
        >
          <Text textSize="title" textWeight="500">
            $1,410.16
          </Text>
          <Text textSize="caption" textColor="light">
            per month
          </Text>
        </Div>
        <Div d="flex" justify="space-between" p={{ t: '1rem', b: '1.5rem' }}>
          <Div>
            <Text textSize="caption" textColor="dark">
              Payment Card
            </Text>
            <Text textSize="caption" textColor="light">
              Component
            </Text>
          </Div>
          <Div>
            <Div d="flex" h="20px">
              {[1, 2, 3, 4, 5].map((num) => (
                <Icon
                  key={num}
                  name="StarSolid"
                  size="14px"
                  color={num === 5 ? 'gray400' : 'info700'}
                  m={{ r: '0.125rem' }}
                />
              ))}
            </Div>
            <Text textSize="caption" textColor="light">
              Rated 4.0/5
            </Text>
          </Div>
        </Div>
        <Button
          rounded="lg"
          bg="info700"
          hoverBg="info800"
          w="100%"
          textWeight="500"
        >
          Use this design system
        </Button>
      </Div>
    </>
  );
};

export default BolaoItem;
