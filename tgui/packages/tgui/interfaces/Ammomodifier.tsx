import { useBackend } from 'tgui/backend';
import {
  Button,
  Flex,
  LabeledList,
  NoticeBox,
  Section,
  Select,
} from 'tgui/components';
import { Window } from 'tgui/layouts';

type Data = {
  energy: number;
  error: string | null;
  status: number;
  input_container_1: string | null;
  input_container_2: string | null;
  ammo_box: string | null;
  ammo_type: 'Rifle' | 'SMG' | null;
  selected_special: string | null;
};

export const Autodispenser = () => {
  const { act, data } = useBackend<Data>();
  const {
    energy,
    error,
    status,
    input_container_1,
    input_container_2,
    ammo_box,
    ammo_type,
    selected_special,
  } = data;

  const isReady =
    input_container_1 && input_container_2 && ammo_box && selected_special;

  const statusMessage = ['IDLE', 'RUNNING', 'FINISHED'][status] || 'UNKNOWN';

  const specialAmmoOptions = ['AP', 'LE', 'Holo', 'Explosive'];

  return (
    <Window width={500} height={500} theme="weyland">
      <Window.Content scrollable>
        <Flex direction="column" gap={1}>
          <Section title="Turing Dispenser Controls">
            <NoticeBox color={error ? 'red' : null}>
              Status: {statusMessage} {error}
            </NoticeBox>

            <LabeledList>
              <LabeledList.Item label="Energy">{energy}%</LabeledList.Item>
              <LabeledList.Item label="Input Container 1">
                {input_container_1 || 'None loaded'}
              </LabeledList.Item>
              <LabeledList.Item label="Input Container 2">
                {input_container_2 || 'None loaded'}
              </LabeledList.Item>
              <LabeledList.Item label="Ammo Box">
                {ammo_box || 'None loaded'}
              </LabeledList.Item>
              <LabeledList.Item label="Detected Ammo Type">
                {ammo_type || 'Unknown'}
              </LabeledList.Item>
              <LabeledList.Item label="Special Ammo">
                {ammo_type ? (
                  <Select
                    options={specialAmmoOptions.map((option) => ({
                      value: option,
                      text: option,
                    }))}
                    value={selected_special || ''}
                    onChange={(value) => act('set_special', { type: value })}
                  />
                ) : (
                  'Insert ammo box to select special ammo'
                )}
              </LabeledList.Item>
            </LabeledList>

            <Button
              icon="play"
              fluid
              disabled={!isReady}
              onClick={() => act('run')}
            >
              Run Program
            </Button>

            <Button
              icon="eject"
              fluid
              disabled={!ammo_box}
              onClick={() => act('eject_ammo')}
            >
              Eject Ammo Box
            </Button>

            <Button
              icon="eject"
              fluid
              disabled={!input_container_1 && !input_container_2}
              onClick={() => act('eject_inputs')}
            >
              Eject Input Containers
            </Button>
          </Section>
        </Flex>
      </Window.Content>
    </Window>
  );
};
