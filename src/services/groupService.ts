
import { supabase } from '@/integrations/supabase/client';
import type { Group, GroupMember, GroupMessage } from '@/types/group';
import type { Musician } from '@/types/musician';

export async function loadUserGroups(userId: string): Promise<Group[]> {
  try {
    // Get groups owned by the user
    const { data: ownedGroups, error: ownedError } = await supabase
      .from('groups')
      .select('*')
      .eq('owner_id', userId);
    
    if (ownedError) throw ownedError;
    
    // Get groups where the user is a member
    const { data: memberGroups, error: memberError } = await supabase
      .from('group_members')
      .select('group_id, groups(*)')
      .eq('user_id', userId)
      .in('status', ['invited', 'active']);
    
    if (memberError) throw memberError;
    
    // Combine and deduplicate the results
    const memberGroupsData = memberGroups
      .filter(item => item.groups)
      .map(item => item.groups as Group);
    
    const allGroups = [...(ownedGroups || []), ...memberGroupsData];
    
    // Remove duplicates
    const uniqueGroups = allGroups.filter((group, index, self) => 
      index === self.findIndex(g => g.id === group.id)
    );
    
    return uniqueGroups as Group[] || [];
  } catch (error) {
    console.error('Error loading groups:', error);
    throw error;
  }
}

export async function createGroup(name: string, ownerId: string): Promise<Group> {
  try {
    const { data, error } = await supabase
      .from('groups')
      .insert([
        { name, owner_id: ownerId }
      ])
      .select()
      .single();
    
    if (error) throw error;
    if (!data) throw new Error('No data returned from group creation');
    
    return data as Group;
  } catch (error) {
    console.error('Error creating group:', error);
    throw error;
  }
}

export async function inviteMusicianToGroup(
  groupId: string,
  musicianId: string
): Promise<void> {
  try {
    // First check if user is already in the group
    const { data: existingMember, error: checkError } = await supabase
      .from('group_members')
      .select('*')
      .eq('group_id', groupId)
      .eq('user_id', musicianId)
      .maybeSingle();
    
    if (checkError) throw checkError;
    
    // If already a member, don't add again
    if (existingMember) return;
    
    const { error: memberError } = await supabase
      .from('group_members')
      .insert([
        { 
          group_id: groupId, 
          user_id: musicianId,
          status: 'invited'
        }
      ]);
    
    if (memberError) throw memberError;
  } catch (error) {
    console.error('Error inviting musician to group:', error);
    throw error;
  }
}

export async function getGroupDetails(groupId: string): Promise<Group> {
  try {
    const { data, error } = await supabase
      .from('groups')
      .select('*')
      .eq('id', groupId)
      .single();
    
    if (error) throw error;
    
    return data as Group;
  } catch (error) {
    console.error('Error getting group details:', error);
    throw error;
  }
}

export async function getGroupMembers(groupId: string): Promise<GroupMember[]> {
  try {
    const { data, error } = await supabase
      .from('group_members')
      .select('*, profiles:user_id(*)')
      .eq('group_id', groupId);
    
    if (error) throw error;
    
    return data as unknown as GroupMember[] || [];
  } catch (error) {
    console.error('Error getting group members:', error);
    throw error;
  }
}

export async function sendGroupMessage(
  groupId: string,
  userId: string,
  content: string
): Promise<GroupMessage> {
  try {
    const { data, error } = await supabase
      .from('group_messages')
      .insert([
        {
          group_id: groupId,
          user_id: userId,
          content
        }
      ])
      .select()
      .single();
    
    if (error) throw error;
    
    return data as GroupMessage;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

export async function getGroupMessages(groupId: string): Promise<GroupMessage[]> {
  try {
    const { data, error } = await supabase
      .from('group_messages')
      .select('*, profiles:user_id(*)')
      .eq('group_id', groupId)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    
    return data as unknown as GroupMessage[] || [];
  } catch (error) {
    console.error('Error getting messages:', error);
    throw error;
  }
}

export async function subscribeToGroupMessages(
  groupId: string,
  callback: (message: GroupMessage) => void
) {
  return supabase
    .channel(`group_messages:${groupId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'group_messages',
        filter: `group_id=eq.${groupId}`
      },
      (payload) => {
        callback(payload.new as GroupMessage);
      }
    )
    .subscribe();
}
